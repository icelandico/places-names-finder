import {Component, OnInit, Input, OnChanges, AfterViewInit} from '@angular/core';
import {Layer, Map} from 'leaflet';
import * as carto from '@carto/carto.js';
import { PopUpService } from '../../services/pop-up.service';

@Component({
  selector: 'app-layer',
  template: '',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit, OnChanges {
  @Input() map: Map;
  @Input() client: any;
  @Input() layerSource: string;
  @Input() layerStyle: string;

  layer: any;
  cartoSource: any;
  cartoCSS: any;
  initialLayers = ["S1", "S2"];

  constructor(
    private popupService: PopUpService
  ) {}

  ngOnInit(): void {
    if (!this.layerSource || !this.layerStyle) return;
    this.cartoSource = new carto.source.SQL(this.layerSource);
    this.cartoCSS = new carto.style.CartoCSS(this.layerStyle);

    this.layer = new carto.layer.Layer(this.cartoSource, this.cartoCSS, {
      featureOverColumns: this.getLayersAttributes(this.cartoSource._id)
    });

    if (this.initialLayers.includes(this.cartoSource._id)) this.client.addLayer(this.layer);
    this.client.getLeafletLayer().addTo(this.map);

    this.addClickListener(this.layer);
  }

  // private handleLayerInit(): void {
  //   this.cartoSource = new carto.source.SQL(this.layerSource);
  //   this.cartoCSS = new carto.style.CartoCSS(this.layerStyle);
  //
  //   this.layer = new carto.layer.Layer(this.cartoSource, this.cartoCSS, {
  //     featureOverColumns: this.getLayersAttributes(this.cartoSource._id)
  //   });
  //
  //   this.client.addLayer(this.layer);
  //   this.client.getLeafletLayer().addTo(this.map);
  //
  //   this.addClickListener(this.layer);
  // }

  getLayersAttributes(layer): string[] {
    if (layer === 'S1') {
      return ['jpt_nazwa_'];
    }
    if (layer === 'S2') {
      return ['naz_glowna', 'rodzaj_obi', 'woj', 'powiat'];
    }
  }

  addClickListener(layer): void {
    layer._id === 'L2' && layer.on('featureClicked', featureEvent => this.openPopup(featureEvent));
  }

  openPopup(featureEvent): void {
      this.popupService.createPlacePopup(featureEvent, this.map);
  }

  ngOnChanges(): void {
    if (!this.layer) return;

    console.log('add layer', this.layer)

    this.cartoSource.setQuery(this.layerSource);

    this.cartoCSS.setContent(this.layerStyle)
      .then(() => this.layer.show());
  }
}
