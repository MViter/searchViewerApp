import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SearchResultItemDetailsComponent } from './search-result-item-details/search-result-item-details.component';
import { FavoriteSearchResultsComponent } from './favorite-search-results/favorite-search-results.component';
import { AuthGuardService } from './login-form/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: '', redirectTo: 'search-input', pathMatch: 'full'},
  { path: 'search-input', component: SearchComponent, canActivate: [AuthGuardService]},
  { path: 'search-results', component: SearchResultsComponent},
  { path: 'search-results/:id', component: SearchResultItemDetailsComponent },
  { path: 'favorite-search-results', component: FavoriteSearchResultsComponent },
  { path: 'favorite-search-results/:id', component: SearchResultItemDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
