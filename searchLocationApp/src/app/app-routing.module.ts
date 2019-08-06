import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent},
  { path: '', redirectTo: 'search-input', pathMatch: 'full'},
  { path: 'search-input', component: SearchComponent},
  { path: 'search-results', component: SearchResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
