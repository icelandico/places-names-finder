import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(
    private _translate: TranslateService
  ) { }

  createPopup(placeEvent: any, map): void {
    const popup = L.popup({ closeButton: false });

    let content = '<div class="widget">';

    if (placeEvent.data.naz_glowna || placeEvent.data.naz_rzeki) {
      content += `<h2 class="c-popup__title">${placeEvent.data.naz_glowna || placeEvent.data.naz_rzeki}</h2>`;
    }

    if (placeEvent.data.powiat || placeEvent.data.woj) {
      content += `<p class="c-popup__data">${this._translate.instant('powiat')}: <span class="c-popup__data--bold">${placeEvent.data.powiat}</span><p>`;
      content += `<p class="c-popup__data">${this._translate.instant('wojewodztwo')}: <span class="c-popup__data--bold">${placeEvent.data.woj}</span></p>`;
      content += `<p class="c-popup__data">${this._translate.instant('typ miejscowosci')}: <span class="c-popup__data--bold">${placeEvent.data.rodzaj_obi}</span></p>`;
    }

    popup.setContent(content);
    popup.setLatLng(placeEvent.latLng);

    if (!popup.isOpen()) {
      popup.openOn(map);
    }
  }
}
