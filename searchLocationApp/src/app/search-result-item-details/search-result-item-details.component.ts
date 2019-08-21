import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import { SearchService } from '../search/search.service';
import { LocalStorageService } from '../localstorage.service';
import AppConstants from '../app.constants';
const displayedDetails: string[] = [
  'bathroom_number',
  'bedroom_number',
  'car_spaces',
  'commission',
  'construction_year',
  'datasource_name',
  'property_type',
  'size',
  'latitude',
  'longitude',
  'listing_type',
  'location_accuracy',
];

@Component({
  selector: 'app-search-result-item-details',
  templateUrl: './search-result-item-details.component.html',
  styleUrls: ['./search-result-item-details.component.scss']
})
export class SearchResultItemDetailsComponent implements OnInit {
  id: number;
  searchResult: any;
  searchResultArray: any[];
  isShowDetails: boolean = false;
  keywordsArray: string[] = [];
  isItemInFavorites: boolean = false;
  inFavoriteText: string = AppConstants['IN_FAVORITE'];
  addToFavoriteText: string = AppConstants['ADD_TO_FAVORITE'];
  priceInfoText: string = AppConstants['PRICE_INFO_TEXT'];
  keywordText: string = AppConstants['KEYWORD_TEXT'];
  showBtn: string = AppConstants['BTN_LABELS']['SHOW_DETAILS'];
  hideBtn: string = AppConstants['BTN_LABELS']['HIDE_DETAILS'];
  displayedColumns: string[] = ['name', 'value'];

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private lsService: LocalStorageService) {
    }
    

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          const isFavoritePage = this.route.snapshot.routeConfig.path.indexOf('favorite') !== -1;
          this.searchResult = isFavoritePage ? this.lsService.getFavorite(this.id) : this.searchService.getSearchResultItem(this.id);
          
          const tmpArray: {}[] = Array.from(Object.keys(this.searchResult), ((detail, index) => {
            if(displayedDetails.indexOf(detail) !== -1) {
              return {
                index: index,
                name: this.transformDetailName(detail),
                value: this.searchResult[detail]
              }
              }
          }));
          this.searchResultArray = tmpArray.filter(e => e);
          this.isItemInFavorites = isFavoritePage || this.lsService.isItemInFavorites(this.searchResult);
          this.keywordsArray = this.getKeywordsArray(this.searchResult);
        }
      )
  }

  transformDetailName (detail: string) {
    return detail.charAt(0).toUpperCase() + detail.replace('_', ' ').slice(1) + ':';
  }

  showAdditionalInfo () {
    this.isShowDetails = !this.isShowDetails;
  }

  getKeywordsArray (obj: {} = {}) {
    const keywords = obj && obj.hasOwnProperty('keywords') ? obj['keywords'] : [];
    return keywords.length > 0 ? keywords.split(",") : [];
  }

  isPriceDifferent() {
    return this.searchResult['price_high'] !== this.searchResult['price_low'] && this.searchResult['price_low'] !== this.searchResult['price'];
  }

  manageFavorites () {
    if (!this.isItemInFavorites) {
      setTimeout(() => {this.lsService.storeFavorites(Object.assign(this.searchResult, {id: this.id}))}, 1000);
      
    } else {
      this.lsService.removeFavorite(this.id);
    }
    this.isItemInFavorites = !this.isItemInFavorites;
  }
}
