import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
import 'rxjs/add/operator/map';
import { Search, SearchByCoords } from './search.model';

@Injectable()
export class SearchService {
    // baseUrl: string = 'https://api.nestoria.co.uk/api';
    // testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${this.getPropertyType()}&page=1&place_name=`;
    results: []=[];
    searchChanged = new Subject<any>();
    resultStatus: string;
    coords?: {latitude: string, longitude: string};

    constructor(private http: HttpClient) { }

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
      const { searchPhrase, propertyType } = searchObj;
      let testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${propertyType}&page=1&place_name=${searchPhrase}`;
      this.requestData(testUrl);
    }

    searchByLocation(searchObj: SearchByCoords) {
      const { coords, propertyType } = searchObj;
      const location = `${coords.latitude},${coords.longitude}`;
      let testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${propertyType}&page=1&centre_point=${location}`;
      this.requestData(testUrl);
    }

    requestData (url: string) {
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
              this.setResults(arrayOfResults);
              this.searchChanged.next(arrayOfResults);
          }
      )
    }

    setResults (result: []) {
      this.results = result;
    }
}