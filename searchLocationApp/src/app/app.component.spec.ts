import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture;
  let router;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.get(Router);
    router.initialNavigation();
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'searchLocationApp'`, () => {
    expect(app.title).toEqual('searchLocationApp');
  });

  it('should redirect component to component with initial functionality', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    console.log(`Test App Navigation, navigateSpy = ${navigateSpy}`);
    router.navigate(['/search-input']);
    expect(navigateSpy).toHaveBeenCalledWith(['/search-input']);
  });
});