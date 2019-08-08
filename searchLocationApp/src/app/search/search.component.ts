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
  subscription: Subscription;

  searchForm: FormGroup;
  searchPhrase: string;
  propertyTypes:string[] = ['buy', 'rent', 'share'];
  propertyType: string;

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
      });
  }

  onSearchClicked () {
    const { searchPhrase, propertyType } = this.searchForm.value;
    const searchObj : { searchPhrase : string, propertyType : string } = {
      searchPhrase,
      propertyType
    };
    this.lsService.store(searchObj);
    this.searchService.search(searchObj);
  }

  private initForm () {
    this.searchForm = new FormGroup({
      'searchPhrase': new FormControl(this.searchPhrase, Validators.required),
      'propertyType': new FormControl(this.propertyType, Validators.required)
    })
  }
}
