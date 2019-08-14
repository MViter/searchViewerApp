import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription, Subject } from 'rxjs';

import { SearchService } from '../search/search.service';
import { SpinnerService } from '../spinner/spinner.service';
import { PaginationService } from './pagination.service';
import AppConstants from '../app.constants';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // subscription2: Subscription;
  paginationChanges: Subject<void>;
  stateStatusArray: string[];
  //stateStatus: string;
  searchResults: [] = [];
  matchesText: string = '';
  searchResultText: string = AppConstants['SEARCH_RESULT_TEXT'];
  searchDescriptionText: string = AppConstants['SEARCH_DESCRIPTION_TEXT'];
  noSearchText: string = AppConstants['NO_RESULTS_TEXT'];
  length: number = 1000;
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50];
  currentPage: number = 0;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(
    private searchService: SearchService,
    private spinnerService: SpinnerService,
    private paginationService: PaginationService
    ) {
    //this.stateStatus = this.searchService.getSearchResultStatus();
    this.searchResults = this.searchService.getSearchResultItems();
  }

  ngOnInit() {
    this.searchResults = [];
    this.subscription = this.searchService.searchChanged
    .subscribe(
      (results: []) => {
        this.searchResults = results;
        this.searchResults.length + `${this.searchResults.length} of ${this.length} matches`,
        this.iterator();
      }
    );
    this.searchResults = this.searchService.getSearchResultItems();
  }

  isSpinnerShown = () => {
    return this.spinnerService.getStatus();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    console.log(`pageSizeOptions = ${this.pageSizeOptions}`);
  }

  onPageChanged (e: any)  {
    console.log(`onPageChanged, event = ${JSON.stringify(e)}`);
    this.paginationService.changePage(e.pageIndex);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    //const part = this.searchResults.slice(start, end);
    //this.searchResults = part;
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
    // this.subscription2.unsubscribe();
  }
}
