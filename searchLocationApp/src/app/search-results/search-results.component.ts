import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../search/search.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  stateStatusArray: string[];
  stateStatus: string;
  searchResults: [] = [];
  matchesNumber: number=0;
  
  constructor(
    private searchService: SearchService,
    private spinnerService: SpinnerService
    ) {
    this.stateStatus = this.searchService.getSearchResultStatus();
    this.searchResults = this.searchService.getSearchResultItems();
    this.matchesNumber = this.searchResults.length;
  }

  ngOnInit() {
    this.searchResults = [];
    this.subscription = this.searchService.searchChanged
    .subscribe(
      (results: []) => {
        this.searchResults = results;
      }
    );
    this.searchResults = this.searchService.getSearchResultItems();
  }

  isSpinnerShown = () => {
    return this.spinnerService.getStatus();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
