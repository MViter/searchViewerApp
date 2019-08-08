import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { LocalStorageService } from './localstorage.service';

@Component({
  selector: 'app-resent-search-item',
  templateUrl: './resent-search-item.component.html',
  styleUrls: ['./resent-search-item.component.scss']
})
export class ResentSearchItemComponent implements OnInit {

  @Input() index: number;
  @Input() search: {searchPhrase:string, propertyType:string};

  constructor(private searchService: SearchService, private lsService: LocalStorageService) { }

  ngOnInit() {
  }

  onRecentSearchClicked() {
    const { searchPhrase, propertyType } = this.search;
    console.log(`Recent search for: ${searchPhrase}, ${propertyType}`);
    const recentSearchObj = { searchPhrase, propertyType };
    this.searchService.search(recentSearchObj);
  }

  onClickDelete(index:number) {
    this.lsService.remove(index);
  }
}
