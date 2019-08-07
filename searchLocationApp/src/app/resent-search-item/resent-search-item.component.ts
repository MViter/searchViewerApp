import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resent-search-item',
  templateUrl: './resent-search-item.component.html',
  styleUrls: ['./resent-search-item.component.scss']
})
export class ResentSearchItemComponent implements OnInit {

  @Input() recentSearch: any;
  @Input() index: number;
  @Input() seach: any;

  constructor() { }

  ngOnInit() {
  }

}
