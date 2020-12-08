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
      content += `<h2 class="c-popup__title">${placeEvent.data.naz_glowna}</h2>`;
    }

    if (placeEvent.data.powiat || placeEvent.data.woj) {
      content += `<p class="c-popup__data">Powiat: <span class="c-popup__data--bold">${placeEvent.data.powiat}</span><p>`;
      content += `<p class="c-popup__data">Województwo: <span class="c-popup__data--bold">${placeEvent.data.woj}</span></p>`;
      content += `<p class="c-popup__data">Typ miejscowości: <span class="c-popup__data--bold">${placeEvent.data.rodzaj_obi}</span></p>`;
    }

    popup.setContent(content);
    popup.setLatLng(placeEvent.latLng);

    if (!popup.isOpen()) {
      popup.openOn(map);
    }
  }
}