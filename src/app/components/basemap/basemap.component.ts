import { Component, OnInit, Input } from '@angular/core';
import { Map, TileLayer, Control } from 'leaflet';

@Component({
  selector: 'app-basemap',
  template: ''
})
export class BasemapComponent implements OnInit {
  @Input() map: Map;
  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.map) return;

    new TileLayer(this.url).addTo(this.map);
    new Control.Zoom({ position: 'bottomright' }).addTo(this.map);
  }
}
