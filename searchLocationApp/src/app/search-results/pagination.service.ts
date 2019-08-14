import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SearchService } from '../search/search.service';
import { from } from 'rxjs';

export interface LoaderState {
    show: boolean;
}

@Injectable()
export class PaginationService {
    paginationChanged = new Subject<any>();
    loaderState = this.paginationChanged.asObservable();

    constructor(private searchService: SearchService) { }
    
    changePage (pageIndex: any) {
        const nextPage = pageIndex + 1;
        console.log(`PaginationService, change page from ${pageIndex} to ${nextPage}`);
        this.searchService.resetResultArray();
        this.searchService.searchPage(nextPage);
        this.paginationChanged.next(nextPage);
    }

    getStatus (): boolean {
        return true;
    }
}