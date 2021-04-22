import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control } from 'leaflet';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-carto-map',
  templateUrl: './map.component.template.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;

  @Input() center;
  @Input() zoom;
  @Output() onMapCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.map = new Map('map', {
      center: this.center,
      zoom: this.zoom,
      zoomControl: false,
    });

    this.onMapCreated.emit(this.map);
  }
}
