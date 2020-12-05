import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Map } from 'leaflet';
import * as carto from '@carto/carto.js';

@Component({
  selector: 'app-layer',
  template: ''
})
export class LayerComponent implements OnInit, OnChanges {
  @Input() map: Map;
  @Input() client: any;
  @Input() layerSource: string;
  @Input() layerStyle: string;

  layer: any;
  cartoSource: any;
  cartoCSS: any;

  constructor() {}

  ngOnInit(): void {
    if (!this.layerSource || !this.layerStyle) return;

    this.cartoSource = new carto.source.SQL(this.layerSource);
    this.cartoCSS = new carto.style.CartoCSS(this.layerStyle);

    this.layer = new carto.layer.Layer(this.cartoSource, this.cartoCSS);
    this.layer.hide();

    this.client.addLayer(this.layer);
    this.client.getLeafletLayer().addTo(this.map);
  }

  ngOnChanges(): void {
    if (!this.layer) return;

    this.cartoCSS.setContent(this.layerStyle)
      .then(() => this.layer.show());
  }
}
