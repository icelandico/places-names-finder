import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { predefinedOptions } from './predefinedOptions';

@Component({
  selector: 'app-predefined-options',
  templateUrl: './predefinedOptions.template.html',
  styleUrls: ['./predefinedOptions.component.scss']
})
export class PredefinedOptionsComponent implements OnInit {
  @Output() searchOption: EventEmitter<string> = new EventEmitter<string>();
  @Input() set layer(lyr) {
    this.options = predefinedOptions[lyr];
  }

  options: string[];
  constructor() { }

  ngOnInit(): void {
  }

  onOptionsChange(event): void {
    this.searchOption.emit(event.target.value);
  }

}
