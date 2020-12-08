import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;
  @Input() placesNumber: number;

  constructor() { }

  ngOnInit(): void { }

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

}
