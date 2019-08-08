import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
const STORAGE_KEY = 'search_storage';

@Injectable()
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
        
    store (searchText: string): void {
        if (searchText === '') return;
        const currentLsData = this.storage.get(STORAGE_KEY) || [];
        const index = currentLsData.length + 1;
        const newObj = { index, searchText};
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