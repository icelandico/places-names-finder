import {Component, OnInit} from '@angular/core';
import { Map } from 'leaflet';
import * as carto from '@carto/carto.js';
import { buildStyle } from './utils/style';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map: Map;
  cartoClient: any;
  layerSource = `SELECT * FROM wojewodztwa`;
  pointsLayerSource = this.getAllPoints();
  searchValue: string;
  optionValue: string;
  placesNumber: number;
  layerStyle = `
    #layer {
      polygon-fill: rgba(22, 33, 44, 0.5);
    }
  `;

  pointsLayerStyle = `
    #layer {
      marker-width: 5;
      marker-fill: #FFB927;
      marker-fill-opacity: 0.9;
      marker-allow-overlap: true;
      marker-line-width: 1;
      marker-line-color: #FFF;
      marker-line-opacity: 1;

      [zoom < 7]{ marker-width: 2; }
      [zoom >= 8]{ marker-width: 8; }
      [zoom >= 10]{ marker-width: 11; }
    }
  `;

  constructor() {
    this.cartoClient = new carto.Client({
      apiKey: 'default_public',
      username: 'icelandico'
    });
  }

  ngOnInit(): void {
    this.fetchPoints('');
  }

  public onMapCreated(map): void {
    this.map = map;
  }

  public submitValue($event): void {
    this.searchValue = $event;
    this.pointsLayerSource = this.querySource($event);
    this.fetchPoints($event);
  }

  public handleOption($event): void {
    this.optionValue = $event;
  }

  private querySource($event): string {
    switch (this.optionValue) {
      case 'start':
        return this.queryStart($event);
        break;
      case 'end':
        return this.queryEndings($event);
        break;
      default:
        return this.queryAll($event);
    }
  }

  private async fetchPoints(phrase): Promise<any> {
    const url = encodeURI(`https://icelandico.carto.com/api/v2/sql?q=${this.querySource(phrase)}`);
    const urlFetch = await fetch(url);
    const res = await urlFetch.json();
    this.placesNumber = res.total_rows;
  }

  private queryAll(name: string): string {
    return `
      SELECT * FROM pl_points
      WHERE lower(naz_glowna)
      LIKE '%${name.toLowerCase()}%' `;
  }

  private queryEndings(name): string {
    return `
      SELECT * FROM pl_points
      WHERE lower(naz_glowna)
      LIKE '%${name.toLowerCase()}' `;
  }

  private queryStart(name): string {
    return `
      SELECT * FROM pl_points
      WHERE lower(naz_glowna)
      LIKE '${name.toLowerCase()}%' `;
  }

  private getAllPoints(): string {
    return `SELECT * FROM pl_points`;
  }

  public onWidgetDataChanged(data): void {
    this.layerStyle = buildStyle(data, ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f']);
  }
}
