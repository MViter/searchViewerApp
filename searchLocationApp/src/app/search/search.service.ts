import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
import 'rxjs/add/operator/map';
import { Search, SearchByCoords } from './search.model';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';


@Injectable()
export class SearchService {
    // baseUrl: string = 'https://api.nestoria.co.uk/api';
    // testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${this.getPropertyType()}&page=1&place_name=`;
    results: []=[];
    searchChanged = new Subject<any>();
    resultStatus: string;
    coords?: {latitude: string, longitude: string};

    constructor(
      private http: HttpClient,
      private spinnerService: SpinnerService
    ) { }

    getSearchResultStatus () {
      return "searchResults";
    }

    getSearchResultItems () {
      return this.results;
    }

    getSearchResultItem (i: number) {
      return this.results.slice()[i];
    }

    search(searchObj: Search) {
      this.showLoader();
      const { searchPhrase, propertyType } = searchObj;
      let testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${propertyType}&page=1&place_name=${searchPhrase}`;
      return this.getData(testUrl);
    }

    searchByLocation(searchObj: SearchByCoords) {
      this.showLoader();
      const { coords, propertyType } = searchObj;
      const location = `${coords.latitude},${coords.longitude}`;
      let testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${propertyType}&page=1&centre_point=${location}`;
      this.getData(testUrl);
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
      console.log('show spinner');
      this.spinnerService.show();
    }

    hideLoader() {
      console.log('hide spinner');
      this.spinnerService.hide();
    }

    setResults (result: []) {
      this.results = result;
    }
}