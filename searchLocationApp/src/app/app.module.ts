import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material-components'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SearchService } from './search/search.service';
import { SearchComponent } from './search/search.component';
import { AuthInterceptor } from './auth.interceptor';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SearchResultItemDetailsComponent } from './search-result-item-details/search-result-item-details.component';
import { ResentSearchItemComponent } from './resent-search-item/resent-search-item.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './localstorage.service';
import { FavoriteSearchResultsComponent } from './favorite-search-results/favorite-search-results.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { PaginationService } from './search-results/pagination.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuardService } from './login-form/auth-guard.service';
import { AuthService } from './login-form/auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    SearchResultItemComponent,
    MainScreenComponent,
    SearchResultItemDetailsComponent,
    ResentSearchItemComponent,
    FavoriteSearchResultsComponent,
    SpinnerComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LocalStorageService,
    SpinnerService,
    PaginationService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
