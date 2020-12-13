import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from '../translate';

@Injectable()
export class TranslateService {
  private _currentLang = this.setInitialLanguage();

  public get currentLang(): string {
    return this._currentLang;
  }

  setInitialLanguage(): string {
    const storageValue = window.localStorage.getItem('lang');
    return storageValue || 'en';
  }

  setLangInStorage(lang): void {
    console.log(lang)
    window.localStorage.setItem('lang', lang);
  }

  constructor(
    @Inject(TRANSLATIONS) private _translations: any
  ) {}

  public use(lang: string): void {
    this._currentLang = lang;
  }

  private translate(key: string): string {
    const translation = key;

    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    return translation;
  }

  public instant(key: string): string {
    return this.translate(key);
  }
}
