import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from './search.service';
import { LocalStorageService } from '../localstorage.service';
import { Search, SearchByCoords, Coords } from './search.model';
import AppConstants from '../app.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  searchResults: [] = [];
  recentSearches: [] = [];
  propertySearchText: string = AppConstants['PROPERTY_SEARCH_DESCRIPTION_TEXT'];
  searchInputPlaceholderText: string = AppConstants['SEARCH_INPUT_PLACEHOLDER_TEXT'];
  propertyTypeText: string = AppConstants['PROPERTY_TYPE'];

  searchForm: FormGroup;
  searchPhrase: string = '';
  propertyTypes: string[] = ['buy', 'rent', 'share'];
  propertyType: string = this.propertyTypes[0];
  stateStatus: string = 'initial';
  coords: Coords;

  constructor(
    private searchService: SearchService,
    private lsService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.subscription1 = this.searchService.searchChanged
      .subscribe((searchResults) => {
        this.searchResults = searchResults;
      });
      
    this.subscription2 = this.lsService.recentSearchChanged
      .subscribe((recentSearches) => {
        this.recentSearches = recentSearches;
      });

    this.searchResults = this.searchService.getSearchResultItems();
    this.recentSearches = this.lsService.getSearches();
  }

  onSearchClicked () {
    this.searchService.resetResultArray();
    const { searchPhrase, propertyType } = this.searchForm.value;
    const searchObj: Search = {
      searchPhrase,
      propertyType
    };

    this.lsService.storeSearches(searchObj);
    this.searchService.search(searchObj);
  }

  setLocationParams = (latitude: number, longitude: number) => {
    this.coords = {latitude, longitude};
  };

  isSpinnerShown () {
    this.searchService.getSpinnerStatus();
  }

  onMyLocationClicked () {
    this.searchService.resetResultArray();
    const { propertyType } = this.searchForm.value;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = new Coords(position.coords.latitude, position.coords.longitude)
        const searchByCoordsObj = new SearchByCoords(propertyType, coords);
        this.lsService.storeSearches(searchByCoordsObj);
        this.searchService.searchByLocation(searchByCoordsObj);
      });
    } else {
      alert("Sorry, your browser does not support this feature");
    }
  }

  onKeyDown($event: any) {
    if(event['keyCode'] == 13 && this.searchForm.valid) {
      this.onSearchClicked();
      this.router.navigate(["/search-results"]);
    }
  }

  removeAllRecentSearches() {
    this.lsService.removeAllSearches();
  }

  private initForm () {
    this.searchForm = new FormGroup({
      'searchPhrase': new FormControl(this.searchPhrase, Validators.required),
      'propertyType': new FormControl(this.propertyType, Validators.required)
    })
  }

  ngOnDestroy () {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
