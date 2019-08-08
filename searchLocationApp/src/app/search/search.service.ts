import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
    // baseUrl: string = 'https://api.nestoria.co.uk/api';
    propertyType: string = '';
    // testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${this.getPropertyType()}&page=1&place_name=`;
    results: []=[];
    searchChanged = new Subject<any>();
    resultStatus: string;

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

    search(searchObj: {searchPhrase:string, propertyType:string}) {
      const { searchPhrase, propertyType } = searchObj;
      if (searchPhrase === '') return;

      let testUrl: string = `http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=${propertyType}&page=1&place_name=${searchPhrase}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      this.propertyType = propertyType;
      this.http.get(testUrl, {responseType: 'text', headers})
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