import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { SearchResultItemDetailsComponent } from './search-result-item-details/search-result-item-details.component';
import { FavoriteSearchResultsComponent } from './favorite-search-results/favorite-search-results.component';

const routes: Routes = [
  // { path: '', component: HomeComponent},
  { path: '', redirectTo: 'search-input', pathMatch: 'full'},
  { path: 'search-input', component: SearchComponent},
  { path: 'search-results', component: SearchResultsComponent},
  { path: 'search-results/:id', component: SearchResultItemDetailsComponent },
  { path: 'favorite-search-results', component: FavoriteSearchResultsComponent },
  { path: 'favorite-search-results/:id', component: SearchResultItemDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
