import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from './search.service';
import { LocalStorageService } from '../localstorage.service';
import { Search, SearchByCoords, Coords } from './search.model';

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
    this.recentSearches = this.lsService.get();
  }

  onSearchClicked () {
    const { searchPhrase, propertyType } = this.searchForm.value;
    const searchObj: Search = {
      searchPhrase,
      propertyType
    };

    this.lsService.store(searchObj);
    this.searchService.search(searchObj);
  }

  setLocationParams = (latitude: number, longitude: number) => {
    this.coords = {latitude, longitude};
  };

  onMyLocationClicked () {
    const { propertyType } = this.searchForm.value;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.coords = { latitude, longitude };
        const searchByCoordsObj: SearchByCoords = {
          coords: this.coords,
          propertyType
        };
        this.lsService.storeByLocation(searchByCoordsObj);
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
    this.lsService.removeAll();
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
