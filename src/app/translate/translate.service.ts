import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './index'; // import our opaque token

@Injectable()
export class TranslateService {
  private _currentLang: string;

  public get currentLang(): string {
    return this._currentLang = 'en';
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
