import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// import { Subject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Search, SearchByCoords } from './search/search.model';
const STORAGE_KEY = 'recentSearchStorage';
const STORAGE_KEY2 = 'favoritesStorage';

@Injectable()
export class LocalStorageService {
    recentSearchChanged = new Subject<any>();
    favoritesChanged = new Subject<any>();

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
        
    store (searchObj: Search): void {
        const { searchPhrase, propertyType } = searchObj;
        this.writeData(searchPhrase, propertyType);
    }

    storeByLocation(searchLocationObj: SearchByCoords) {
        const { coords, propertyType } = searchLocationObj;
        const searchPhrase = `lat = ${coords.latitude}: lng = ${coords.longitude}`;
        this.writeData(searchPhrase, propertyType);
    }

    storeFavorite (favoritesObj: any): void {
        if (this.isItemInFavorites(favoritesObj.id)) return;
        const data = this.storage.get(STORAGE_KEY2) || [];
        data.push(favoritesObj);
        this.storage.set(STORAGE_KEY2, data);
    }

    removeFavorite (index: number) {
        const data = this.storage.get(STORAGE_KEY2) || [];
        data.splice(index, 1);
        this.storage.set(STORAGE_KEY2, data);
        this.recentSearchChanged.next(this.get().slice());
    }

    getFavoritesItems () {
        return this.storage.get(STORAGE_KEY2) || [];
    }

    getFavoriteItem (id: number) {
        const data = this.storage.get(STORAGE_KEY2) || [];
        return data[id];
    }

    isItemInFavorites (favObj: any) {
        const favorites = this.storage.get(STORAGE_KEY2) || [];
        if (favorites.length === 0) return false;
        let isItemInFavorites = false;
        favorites.forEach((favorite: Search) => {
            if (favorite['title'] === favObj.title) {
                isItemInFavorites = true;
                return isItemInFavorites;
            }
        });
        return isItemInFavorites;
    }

    writeData (searchPhrase: string, propertyType: string) {
        if (searchPhrase === '' || !this.isUnique({searchPhrase, propertyType})) return;
        const nextIndex = this.getLength() + 1;
        const newSearchObj = { nextIndex, searchPhrase, propertyType};
        const data = this.get();
        data.push(newSearchObj);
        this.set(data);
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
        return isUnique;
    }

    get () {
        return this.storage.get(STORAGE_KEY) || [];
    }

    remove (index: number) {
        const data = this.get();
        data.splice(index, 1);
        this.set(data.slice());
        this.recentSearchChanged.next(this.get().slice());
    }

    removeAll () {
        this.storage.remove(STORAGE_KEY);
        this.recentSearchChanged.next([]);
    }

    set (data: Search[]) {
        this.storage.set(STORAGE_KEY, data);
    }
}