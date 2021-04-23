import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-options',
  templateUrl: './searchOptions.component.html',
  styleUrls: ['./searchOptions.component.scss']
})
export class SearchOptionsComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionValue: EventEmitter<string> = new EventEmitter<string>();
  @Input() activeOption;
  @Input() searchPhrase;
  @Input() placesNumber: number;
  initialLang: string;

  constructor(

  ) {}

  onChange(e): void {
    this.optionValue.emit(e.target.value);
  }
}

