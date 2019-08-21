import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
import 'rxjs/add/operator/map';
import { Search, SearchByCoords } from './search.model';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
const url = 'http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json';

@Injectable()
export class SearchService {
    results: []=[];
    searchChanged = new Subject<any>();
    resultStatus: string;
    pageNum: number = 1;
    prevSearch: string = '';
    prevPropertyType: string = '';
    coords?: {latitude: string, longitude: string};

    constructor(
      private http: HttpClient,
      private spinnerService: SpinnerService
    ) { }

    getSearchResultItems () {
      return this.results;
    }

    getSearchResultItem (i: number) {
      return this.results.slice()[i];
    }

    definePrevSearchObj (prevSearch: string, prevPropertyType: string) {
      this.prevSearch = prevSearch;
      this.prevPropertyType = prevPropertyType;
    }

    search(searchObj: Search) {
      this.showLoader();
      const { searchPhrase, propertyType } = searchObj;
      this.definePrevSearchObj(searchPhrase, propertyType);
      let searchUrl: string = `${url}&listing_type=${propertyType}&page=${this.pageNum}&place_name=${searchPhrase}`;
      return this.getData(searchUrl);
    }

    searchByLocation(searchObj: SearchByCoords) {
      this.showLoader();
      const { coords, propertyType } = searchObj;
      const location = `${coords.latitude},${coords.longitude}`;
      let searchUrl: string = `${url}&listing_type=${propertyType}&page=${this.pageNum}&centre_point=${location}`;
      this.getData(searchUrl);
    }

    searchPage(pageIndex: number) {
      this.showLoader();
      console.log(`searching for page ${pageIndex}`);
      let searchUrl: string = `${url}&listing_type=${this.prevPropertyType}&page=${pageIndex}&place_name=${this.prevSearch}`;
      return this.getData(searchUrl);
    }

    getData (url: string) {
      this.http.get(url, {responseType: 'text'})
      .map(
          (data: any) => {
              const response = data;
              return response;
          }
      )
      .subscribe(
          (response: string) => {
              const arrayOfResults:[] = Array.prototype.slice.call(JSON.parse(response).response.listings);
              
              setTimeout(() => {
                this.hideLoader();
                this.setResults(arrayOfResults);
                this.searchChanged.next(arrayOfResults);
              }, 1000);
          }
      )
    }

    resetResultArray () {
      this.results = [];
      this.searchChanged.next(this.results);
    }

    getSpinnerStatus () {
      this.spinnerService.getStatus();
    }

    showLoader() {
      this.spinnerService.show();
    }

    hideLoader() {
      this.spinnerService.hide();
    }

    setResults (result: []) {
      this.results = result;
    }
}