import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { mockData } from './mockData';

@Injectable()
export class SearchService {
    // baseUrl: string = 'https://api.nestoria.co.uk/api';
    exampleUrl: string = 'http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&centre_point=51.684183,-3.431481';
    private results: any;
    searchChanged = new Subject<any>();
    resultStatus: string;

    constructor(private http: HttpClient) { }

    getSearchResultStatus () {
      // return this.resultStatus;
      return "searchResults";
    }

    getSearchResultItems () {
      // return this.results;
      return mockData;
    }

    getSearchResultItem (i: number) {
      return mockData.slice()[i];
    }

    search(queryString: string) {
      // let url = this.exampleUrl;
      // //let searchUrl = url + queryString;
      // let searchUrl = url;
      // console.log(`SEARCHSERVICE searchUrl = ${searchUrl}`);
      // const results = this.http.get('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&centre_point=51.684183,-3.431481');
      
      // this.results = results;
      // console.log(`SEARCHSERVICE results = ${results}`);
      // this.searchChanged.next(this.results);

      // const params = new HttpParams({fromString: 'name=term'});
      // return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      // this.http.get(this.exampleUrl, {responseType: 'text', headers})
      //   .subscribe(data => console.log(data));
        this.resultStatus = "searchResults";
        this.results = mockData;
        return this.results;
    }
}