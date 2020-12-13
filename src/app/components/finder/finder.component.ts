import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionValue: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;
  @Input() placesNumber: number;
  initialLang: string;

  constructor(
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initialLang = this._translate.currentLang;
  }

  onSubmit(param?: string): void {
    let inputValue;
    if (param) {
      inputValue = '';
      this.input.nativeElement.value = inputValue;
    } else {
      inputValue = this.input.nativeElement.value;
    }
    this.searchValue.emit(inputValue);
  }

  onChange(e): void {
    this.optionValue.emit(e.target.value);
  }

  onLangChange(event: Event): void {
      const eventValue = event.target as HTMLSelectElement;
      this._translate.use(eventValue.value);
      this._translate.setLangInStorage(eventValue.value);
    }
}

