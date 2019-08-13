import { Component, OnInit } from '@angular/core';
import AppConstants from '../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerText: string = '';
  constructor() { }

  ngOnInit() {
    this.headerText = AppConstants['HEADER_TEXT'];
  }

}
