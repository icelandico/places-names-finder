import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-options',
  templateUrl: './searchOptions.component.html',
  styleUrls: ['./searchOptions.component.scss']
})
export class SearchOptionsComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() layerOption: EventEmitter<string> = new EventEmitter<string>();
  @Input() activeOption;
  @Input() activeLayer = 'rivers';
  @Input() searchPhrase;
  @Input() placesNumber: number;
  @Input() optionsActive: boolean;
  initialLang: string;

  constructor(

  ) {}

  onChange(e): void {
    this.optionValue.emit(e.target.value);
  }

  onLayerChange(e): void {
    this.layerOption.emit(e.target.value);
  }
}

