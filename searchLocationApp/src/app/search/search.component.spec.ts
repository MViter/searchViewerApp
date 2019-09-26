import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { SpinnerService } from '../spinner/spinner.service';
import { LocalStorageService } from '../localstorage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import AppConstants from '../app.constants';

describe('Test Search Component', () => {
    // let httpClient: HttpClient;
    // let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                HttpClientModule,
               //  HttpClientTestingModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                SearchService,
                SpinnerService,
                LocalStorageService,
                HttpClient,
                HttpClientModule
            ]
        });
        //).compileComponents();
        //httpClient = TestBed.get(HttpClient);
        //httpTestingController = TestBed.get(HttpTestingController);
    }));

    it('SearchComponent component should create the SearchComponent component', () => {
        const fixture = TestBed.createComponent(SearchComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('SearchComponent component should have appropriate title', () => {
        const fixture = TestBed.createComponent(SearchComponent);
        const inst = fixture.debugElement.componentInstance;
        expect(inst.titleText).toContain(AppConstants['PROPERTY_SEARCH_TEXT']);
    });

    it('SearchComponent component should have 2 childern elements', () => {
        const fixture = TestBed.createComponent(SearchComponent);
        const children = fixture.debugElement.children;
        expect(children.length).toBe(2);
    });
});