import { Component, OnInit } from '@angular/core';
import { Map } from 'leaflet';
import * as carto from '@carto/carto.js';
import { environment } from '../environments/environment';

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
  searchValue = '';
  optionValue = 'all';
  placesNumber: number;
  layerStyle = `
    #layer {
      polygon-fill: rgba(22, 33, 44, 0.5);
      line-color: rgba(224, 216, 214, 1);
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

  linesLayerStyle = `
    #layer {
      line-width: 5;
      line-join: miter;
      line-color: #FFF;
      line-opacity: 1;

      [zoom < 7]{ line-width: 2; }
      [zoom >= 8]{ line-width: 8; }
      [zoom >= 10]{ line-width: 11; }
    }
  `;
  chosenLayer = 'places';
  layerOptions = {
    places: {
      layer: 'pl_points',
      name: 'places',
      layerStyle: this.pointsLayerStyle,
      source: this.getAllPoints(),
      nameField: 'naz_glowna'
    },
    rivers: {
      layer: 'rivers_pl',
      name: 'rivers',
      layerStyle: this.linesLayerStyle,
      source: this.getAllLines(),
      nameField: 'naz_rzeki'
    }
  };

  constructor() {
    this.cartoClient = new carto.Client({
      apiKey: environment.apiKey,
      username: environment.username
    });
  }

  ngOnInit(): void {
    this.fetchPoints('');
    console.log('client', this.cartoClient)
  }

  public onMapCreated(map): void {
    this.map = map;
  }

  public onChangeLayer(layer): void {
    this.chosenLayer = layer;
  }

  public submitValue($event, predefined?): void {
    if (predefined) {
      let newValue = '';
      if ($event[0] === '-') {
        this.optionValue = 'end';
        newValue = $event.slice(1);
      } else if ($event[$event.length - 1] === '-') {
        this.optionValue = 'start';
        newValue = $event.slice(0, $event.length - 1);
      } else {
        this.optionValue = 'all';
        newValue = $event;
      }
      this.searchValue = newValue;
      this.pointsLayerSource = this.querySource(newValue);
      this.fetchPoints(newValue);
      return;
    }

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
      SELECT * FROM ${this.layerOptions[this.chosenLayer].layer}
      WHERE lower(${this.layerOptions[this.chosenLayer].nameField})
      LIKE '%${name.toLowerCase()}%'`;
  }

  private queryEndings(name): string {
    return `
      SELECT * FROM ${this.layerOptions[this.chosenLayer].layer}
      WHERE lower(${this.layerOptions[this.chosenLayer].nameField})
      LIKE '%${name.toLowerCase()}'`;
  }

  private queryStart(name): string {
    return `
      SELECT * FROM ${this.layerOptions[this.chosenLayer].layer}
      WHERE lower(${this.layerOptions[this.chosenLayer].nameField})
      LIKE '${name.toLowerCase()}%'`;
  }

  private getAllPoints(): string {
    return `SELECT * FROM pl_points`;
  }

  private getAllLines(): string {
    return `SELECT * FROM rivers_pl`;
  }
}
