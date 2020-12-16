import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-predefined-options',
  templateUrl: './predefinedOptions.template.html',
  styleUrls: ['./predefinedOptions.component.scss']
})
export class PredefinedOptionsComponent implements OnInit {
  @Output() searchOption: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onOptionsChange(event): void {
    this.searchOption.emit(event.target.value);
  }

}
