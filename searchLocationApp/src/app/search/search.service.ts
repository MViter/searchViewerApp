import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';
import * as rxjs from 'rxjs/add/operator/map';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable()
export class SearchService {
    clientID: string = 'PAST YOUR CLIENT ID';
    // baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q=';
    baseUrl: string = 'https://api.nestoria.co.uk/api';
    exampleUrl: string = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&centre_point=51.684183,-3.431481';

    constructor(private http: HttpClient) { }

    search(queryString: string) {
      // let _URL = this.baseUrl + queryString;
      let _URL = this.exampleUrl;
      return this.http.get(_URL, {
        headers: {
          'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
        }
     });
    }
}