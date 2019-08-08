import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst
const STORAGE_KEY = 'search_storage';

@Injectable()
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
        
    store (searchText: string): void {
        const currentLsData = this.storage.get(STORAGE_KEY) || [];
        const index = currentLsData.length + 1;
        const newObj = {
            index,
            searchText
        }
        console.log(`Localstorage Service:\n!!! currentLsData = ${currentLsData},\n !!! searchText = ${searchText},\n !!! newObj = ${newObj}`);
        currentLsData.push(newObj);
        this.storage.set(STORAGE_KEY, currentLsData);
    }

    get () {
        return this.storage.get(STORAGE_KEY);
    }

    remove () {
        this.storage.remove(STORAGE_KEY)
    }
}