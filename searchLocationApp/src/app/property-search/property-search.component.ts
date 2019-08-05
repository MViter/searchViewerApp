import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
// import { SearchComponent } from '../search/search.component';
import { SearchResultSectionComponent } from '../search-result-section/search-result-section.component';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}