import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {
  @Input() searchResult: any;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
