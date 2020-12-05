import { Component } from '@angular/core';
import { Map } from 'leaflet';
import * as carto from '@carto/carto.js';
import { buildStyle } from './utils/style';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  map: Map;
  cartoClient: any;

  layerSource = 'SELECT * FROM listings WHERE price < 150';
  layerStyle = `
    #layer {
      marker-width: 5;
      marker-fill-opacity: 0.7;
      marker-allow-overlap: true;
      marker-line-width: 0;
      marker-comp-op: multiply;
    }
  `;

  constructor() {
    this.cartoClient = new carto.Client({
      apiKey: 'default_public',
      username: 'icelandico'
    });
  }

  public onMapCreated(map): void {
    this.map = map;
  }

  public onWidgetDataChanged(data): void {
    this.layerStyle = buildStyle(data, ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f']);
  }
}
