import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
const STORAGE_KEY = 'search_storage';

@Injectable()
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
        
    store (searchObj: {searchPhrase:string, propertyType:string}): void {
        const { searchPhrase, propertyType } = searchObj;
        if (searchPhrase === '' || !this.isUnique(searchObj)) return;
        const currentLsData = this.get();
        
        const nextIndex = this.getLength() + 1;
        const newSearchObj = { nextIndex, searchPhrase, propertyType};
        currentLsData.push(newSearchObj);
        this.set(currentLsData);
    }

    get () {
        return this.storage.get(STORAGE_KEY) || [];
    }

    remove (index: number) {
        let ls = this.get();
        ls.splice(index, 1);
        this.set(ls);
    }

    removeAll () {
        this.storage.remove(STORAGE_KEY);
    }

    set (currentLsData: []) {
        this.storage.set(STORAGE_KEY, currentLsData);
    }

    getLength () {
        return this.get().length;
    }

    isUnique(obj: {searchPhrase: string, propertyType: string}):boolean {
        const currentLsData = this.get();
        let isUnique = true;
        currentLsData.forEach((search: {searchPhrase: string, propertyType: string}) => 
            (isUnique = !((search.searchPhrase === obj.searchPhrase && search.propertyType === obj.propertyType)))
        );
        return isUnique;
    }
}