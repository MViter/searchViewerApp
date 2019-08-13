import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService, LoaderState } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit, OnDestroy {
  show: boolean = false;
  message: string = 'Loading...';
    private subscription: Subscription;

    constructor(
        private loaderService: SpinnerService
    ) { }

    ngOnInit() {
      console.log(`ngOnInit(), Spinner state: ${this.show}`);
      this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderState) => {
          this.show = state.show;
          console.log(`subscribe, Spinner state: ${this.show}`);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
