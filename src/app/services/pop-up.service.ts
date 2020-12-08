import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  createPlacePopup(placeEvent: any, map): void {
    const popup = L.popup({ closeButton: false });
    let content = '<div class="widget">';

    if (placeEvent.data.naz_glowna) {
      content += `<h2 class="h2">${placeEvent.data.naz_glowna}</h2>`;
    }

    if (placeEvent.data.powiat || placeEvent.data.woj) {
      content += `<p>powiat: </p><h3>${placeEvent.data.powiat}</h3>`;
      content += `<p>województwo</p><h3>${placeEvent.data.woj}</h3>`;
      content += `<p>typ miejscowości</p><h3>${placeEvent.data.rodzaj_obi}</h3>`;
    }

    popup.setContent(content);
    popup.setLatLng(placeEvent.latLng);
    
    if (!popup.isOpen()) {
      popup.openOn(map);
    }
  }
}
