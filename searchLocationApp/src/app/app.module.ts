import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material-components'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HeaderComponent } from './header/header.component';
import { SearchResultSectionComponent } from './search-result-section/search-result-section.component';
import { HomeComponent } from './home/home.component';
import { SearchService } from './search/search.service';
import { SearchComponent } from './search/search.component';
import { AuthInterceptor } from './auth.interceptor';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SearchResultItemDetailsComponent } from './search-result-item-details/search-result-item-details.component';
import { ResentSearchItemComponent } from './resent-search-item/resent-search-item.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './resent-search-item/localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    HeaderComponent,
    SearchComponent,
    SearchResultSectionComponent,
    HomeComponent,
    SearchResultItemComponent,
    MainScreenComponent,
    SearchResultItemDetailsComponent,
    ResentSearchItemComponent
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
  providers: [SearchService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
