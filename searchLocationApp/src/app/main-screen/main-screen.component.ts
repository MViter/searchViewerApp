import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit, OnDestroy  {
  page:any = '';
  sub: any;
  id: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.page = this.route.snapshot.params['bank'];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
