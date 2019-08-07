import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-search-result-item-details',
  templateUrl: './search-result-item-details.component.html',
  styleUrls: ['./search-result-item-details.component.scss']
})
export class SearchResultItemDetailsComponent implements OnInit {
  id: number;
  searchResult: {};
  isShowDetails: boolean = false;
  keywordsArray: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.searchResult = this.searchService.getSearchResultItem(this.id) || {};
          this.keywordsArray = this.getKeywordsArray(this.searchResult);
        }
      )
  }

  showAdditionalInfo () {
    this.isShowDetails = !this.isShowDetails;
  }

  getKeywordsArray (obj: {} = {}) {
    const keywords = obj && obj.hasOwnProperty('keywords') ? obj['keywords'] : [];
    return keywords.split(",");
  }

  isPriceDifferent() {
    return this.searchResult['price_high'] !== this.searchResult['price_low'] && this.searchResult['price_low'] !== this.searchResult['price'];
  }
}
