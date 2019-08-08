import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

@Component({
  selector: 'app-resent-search-item',
  templateUrl: './resent-search-item.component.html',
  styleUrls: ['./resent-search-item.component.scss']
})
export class ResentSearchItemComponent implements OnInit {

  @Input() index: number;
  @Input() search: any;

  constructor(private lsService: LocalStorageService) { }

  ngOnInit() {
  }
}
