// import { TestBed, async } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { APP_BASE_HREF } from '@angular/common';
// import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';

// import { SearchResultsComponent } from './search-results.component';
// import { SearchComponent } from '../search/search.component';
// import { FavoriteSearchResultsComponent } from '../favorite-search-results/favorite-search-results.component';

// describe('SearchResult', () => {

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 SearchResultsComponent
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [RouterTestingModule],
//             providers: [
//                 {   provide: APP_BASE_HREF, useValue: '/'}
//             ]
//         }).compileComponents();
//     }));

//     // it('should have a title', async(() => {
//     //     const fixture = TestBed.createComponent(SearchComponent);
//     //     const appInstance = fixture.debugElement.componentInstance;
//     //     console.log(`!!! appInstance.title = ${appInstance.title}`);
//     //     expect(appInstance.title).toEqual('Search results');
//     // }));

//     it('should create the SearchComponent component', () => {
//         const fixture = TestBed.createComponent(SearchComponent);
//         console.log(`!!! TEST SearchComponent, fixture = ${Object.keys(fixture)}`);
//         const app = fixture.debugElement.componentInstance;
//         expect(app).toBeTruthy();
//     });
// });