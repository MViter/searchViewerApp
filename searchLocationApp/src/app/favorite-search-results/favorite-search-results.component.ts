import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';

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

  constructor(private lsService: LocalStorageService) {
    this.searchResults = this.lsService.getFavoritesItems();
  }

  ngOnInit() {
    this.subscription = this.lsService.favoritesChanged
    .subscribe(
      (results: []) => {
        this.searchResults = results;
      }
    );
    this.searchResults = this.lsService.getFavoritesItems();
  }

  ngOnDestroy () {
    // this.subscription.unsubscribe();
  }
}

