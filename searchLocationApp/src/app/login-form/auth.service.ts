import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) {
    }

    initAuthentication () {
        const token = localStorage.setItem('token', 'someToken');
    }

    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      // Check whether the token is expired and return
      // true or false
      return !this.jwtHelper.isTokenExpired(token);
    }
}