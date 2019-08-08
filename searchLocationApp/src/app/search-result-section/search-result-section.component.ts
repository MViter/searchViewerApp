import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../search/search.service';
import { LocalStorageService } from '../resent-search-item/localstorage.service';
@Component({
  selector: 'app-search-result-section',
  templateUrl: './search-result-section.component.html',
  styleUrls: ['./search-result-section.component.scss']
})

export class SearchResultSectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  stateStatusArray: string[];
  stateStatus: string;
  searchResults: any;
  recentSearches: {}[] = [];
  
  constructor(
    private searchService: SearchService,
    private lsService: LocalStorageService) {
    this.stateStatus = "initial";
    this.searchResults = this.searchService.getSearchResultItems();
  }

  ngOnInit() {
    this.subscription = this.searchService.searchChanged
    .subscribe(
      (results: []) => {
        this.searchResults = results;
      }
    );
    this.searchResults = this.searchService.getSearchResultItems();
    this.recentSearches = this.lsService.get();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
