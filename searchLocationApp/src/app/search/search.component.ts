import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from './search.service';
import { LocalStorageService } from '../resent-search-item/localstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any;
  searchForm: FormGroup;
  searchPhrase: string;
  queryField: FormControl = new FormControl();
  subscription: Subscription;
 
  constructor(
    private searchService: SearchService,
    private lsService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.subscription = this.searchService.searchChanged
      .subscribe((results) => {
        this.results = results;
        
        // console.log(`SUBSCRIBE results: ${this.results}`);
      });
  }

  onSearchClicked () {
    this.lsService.store(this.searchForm.value.searchPhrase);
    const data = this.lsService.get();
    console.log(`Search Component:\n!!! localstorage: ${data}, \n!!! new search: ${this.searchForm.value.searchPhrase}`);
    this.searchService.search(this.searchForm.value.searchPhrase);
  }

  private initForm () {
    let searchPhrase = '';
    this.searchForm = new FormGroup({
      'searchPhrase': new FormControl(searchPhrase, Validators.required)
    })
  }
}
