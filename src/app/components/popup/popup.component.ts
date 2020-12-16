import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '../../services/translate.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.template.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() data = {};

  constructor(
    private _translate: TranslateService
  ) {

  }

  ngOnInit(): void {}

}
