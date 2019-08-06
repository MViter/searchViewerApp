import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../search/search.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result-section.component.html',
  styleUrls: ['./search-result-section.component.scss']
})

export class SearchResultSectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  stateStatusArray: string[];
  stateStatus: string;
  searchResults: any;
  
  constructor(private searchService: SearchService) {
    // this.stateStatusArray = ["initial", "error", "listedLocations", "searchResults"];
    // this.stateStatus = this.stateStatusArray[0];
    this.stateStatus = this.searchService.getSearchResultStatus();
    this.searchResults = this.searchService.getSearchResultItems();
    console.log(`this.stateStatus = ${this.stateStatus}`);
  }

  ngOnInit() {
    this.subscription = this.searchService.searchChanged
    .subscribe(
      (results: []) => {
        this.searchResults = results;
      }
    );
    this.searchResults = this.searchService.getSearchResultItems();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
