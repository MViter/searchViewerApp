import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { mockData } from './mockData';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
    // baseUrl: string = 'https://api.nestoria.co.uk/api';
    exampleUrl: string = 'http://localhost:3000/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&centre_point=51.684183,-3.431481';
    private results: any = {};
    private data: []=[];
    searchChanged = new Subject<any>();
    resultStatus: string;

    constructor(private http: HttpClient) { }

    getSearchResultStatus () {
      // return this.resultStatus;
      return "searchResults";
    }

    getSearchResultItems () {
      // return this.results;
      // return mockData;
      // const { response: {listings}}  = this.results;
      return this.data.slice();
    }

    getSearchResultItem (i: number) {
      return this.data.slice()[i];
      // return mockData.slice()[i];
    }

    search(queryString: string) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      // this.http.get(this.exampleUrl, {responseType: 'text', headers})
      //   .subscribe(data => this.results = data)

        // this.resultStatus = "searchResults";
        // this.results = mockData;
        //return this.results;

        this.http.get(this.exampleUrl, {responseType: 'text', headers})
        .map(
            (data: any) => {
                const response = data;
                
                return response;
            }
        )
        .subscribe(
            (response: any) => {
                const results: any = response.json().response;
                console.log(`%%%%%%%%%%%%% res = ${results}`);
                this.setResults(results);
                this.searchChanged.next(results);
            }
        )
    }

    setResults (results: any) {
      this.results = results;
      // this.data = results.response && results.response.listings ? results.response.listings : [];
      this.data = results;
    }
}