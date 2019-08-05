import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: Object = [];
  searchForm: FormGroup;
  searchPhrase: string;
  queryField: FormControl = new FormControl();
 
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.searchService.search(this.searchForm.value.searchPhrase)
    .subscribe( result =>  { 
      this.results = result;
    });
    
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //         this.searchPhrase = params['searchPhrase'];
    //         console.log(`this.searchPhrase = ${this}`);
    //         this.initForm();
    //     }
    //   )
  }

  onSearchClicked () {
    console.log('clicked!');
    console.log(`this.searchPhrase = ${this.searchForm.value.searchPhrase}`);
    this.searchService.search(this.searchForm.value.searchPhrase);
  }

  private initForm () {
    let searchPhrase = '';
    this.searchForm = new FormGroup({
      'searchPhrase': new FormControl(searchPhrase, Validators.required)
    })
  }
}
