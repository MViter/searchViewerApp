import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LocalStorageService } from '../localstorage.service';
import { SpinnerService } from '../spinner/spinner.service';
import AppConstants from '../app.constants';

@Component({
  selector: 'app-favorite-search-results',
  templateUrl: './favorite-search-results.component.html',
  styleUrls: ['./favorite-search-results.component.scss']
})
export class FavoriteSearchResultsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  stateStatusArray: string[];
  stateStatus: string;
  searchResults: [] = [];
  matchesNumber: number=0;
  isSpinnerShown: boolean = true;

  favoriteText: string = AppConstants['FAVORITE_TEXT'];
  favoriteDescriptionText: string = AppConstants['FAVORITE_DESCRIPTION_TEXT'];
  noFavoriteText: string = AppConstants['NO_FAVORITE_TEXT'];

  constructor(
    private lsService: LocalStorageService,
    private spinnerService: SpinnerService) {
    this.searchResults = [];
  }

  ngOnInit() {
    this.spinnerService.show();
    this.emulateLoading();
    this.subscription = this.lsService.favoritesChanged
    .subscribe(
      (results: []) => {
        this.searchResults = results;
      }
    );
    this.searchResults = this.lsService.getFavorites();
  }

  emulateLoading () {
    setTimeout(() => {
      this.spinnerService.hide();
      this.isSpinnerShown = false;
      }, 2000);
  }

  ngOnDestroy () {
    // this.subscription.unsubscribe();
  }
}

