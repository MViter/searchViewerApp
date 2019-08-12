import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { LocalStorageService } from '../localstorage.service';
import { Search } from '../search/search.model';

@Component({
  selector: 'app-resent-search-item',
  templateUrl: './resent-search-item.component.html',
  styleUrls: ['./resent-search-item.component.scss']
})
export class ResentSearchItemComponent implements OnInit {

  @Input() index: number;
  @Input() search: Search;

  constructor(private searchService: SearchService, private lsService: LocalStorageService) { }

  ngOnInit() {
  }

  onRecentSearchClicked() {
    const { searchPhrase, propertyType } = this.search;
    this.searchService.search({ searchPhrase, propertyType });
  }

  onClickDelete(index:number) {
    this.lsService.remove(index);
  }
}
