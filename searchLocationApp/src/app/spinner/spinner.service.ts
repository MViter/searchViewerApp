import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface LoaderState {
    show: boolean;
}

@Injectable()
export class SpinnerService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    isShown: boolean = false;

    constructor() { }
    
    show () {
        this.isShown = true;
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide () {
        this.isShown = false;
        this.loaderSubject.next(<LoaderState>{show: false});
    }

    getStatus (): boolean {
        return this.isShown;
    }
}