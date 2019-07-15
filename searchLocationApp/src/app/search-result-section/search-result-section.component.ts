import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result-section.component.html',
  styleUrls: ['./search-result-section.component.scss']
})
export class SearchResultSectionComponent implements OnInit {
  stateStatusArray: string[];
  stateStatus: string;
  
  constructor() {
    this.stateStatusArray = ["initial", "error", "listedLocations"];
    this.stateStatus = this.stateStatusArray[0];
  }

  ngOnInit() {
  }
}
