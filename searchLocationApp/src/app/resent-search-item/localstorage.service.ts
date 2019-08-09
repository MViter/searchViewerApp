import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// import { Subject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Search } from '../search/search.model';
const STORAGE_KEY = 'search_storage';

@Injectable()
export class LocalStorageService {
    recentSearchChanged = new Subject<any>();

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
        
    store (searchObj: Search): void {
        const { searchPhrase, propertyType } = searchObj;
        if (searchPhrase === '' || !this.isUnique(searchObj)) return;
        const nextIndex = this.getLength() + 1;
        const newSearchObj = { nextIndex, searchPhrase, propertyType};
        const data = this.get();
        data.push(newSearchObj);
        this.set(data);
    }

    get () {
        return this.storage.get(STORAGE_KEY) || [];
    }

    remove (index: number) {
        console.log(`LS before remove: ${JSON.stringify(this.get())}`);
        const data = this.get();
        data.splice(index, 1);
        this.set(data.slice());
        console.log(`LS after remove: ${JSON.stringify(this.get().slice())}`);
        this.recentSearchChanged.next(this.get().slice());
    }

    removeAll () {
        this.storage.remove(STORAGE_KEY);
    }

    set (data: Search[]) {
        this.storage.set(STORAGE_KEY, data);
    }

    getLength () {
        return this.get().length;
    }

    isUnique(obj: Search): boolean {
        const data = this.get();
        let isUnique = true;
        data.forEach((search: Search) => {
            if (search.searchPhrase === obj.searchPhrase && search.propertyType === obj.propertyType) {
                isUnique = false;
                return isUnique;
            }
        });
        console.log(`isUnique = ${isUnique}`);
        return isUnique;
    }
}