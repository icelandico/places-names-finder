import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const inputValue = this.input.nativeElement.value;
    this.searchValue.emit(inputValue);
  }

}
