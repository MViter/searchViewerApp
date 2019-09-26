import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// import { Subject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Search, SearchByCoords } from './search/search.model';
const STORAGE_KEY_SEARCHES = 'recentSearchStorage';
const STORAGE_KEY_FAVORITES = 'favoritesStorage';

@Injectable()
export class LocalStorageService {
    recentSearchChanged = new Subject<any>();
    favoritesChanged = new Subject<any>();

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
    
    //*********************** Methods for storing Recent Search */

    getSearches () {
        return this.get(STORAGE_KEY_SEARCHES) || [];
    }

    storeSearches (searchObj: any): void {
        const searchPhrase: any = searchObj instanceof SearchByCoords
            ? `lat = ${+(searchObj['coords'].latitude).toFixed(2)}: lng = ${+(searchObj.coords.longitude).toFixed(2)}`
            : searchObj.searchPhrase;
        const { propertyType } = searchObj;

        if (searchPhrase === '' || !this.isUnique(STORAGE_KEY_SEARCHES, {searchPhrase, propertyType})) return;
        const newObj = { searchPhrase, propertyType};
        const data = this.get(STORAGE_KEY_SEARCHES);
        data.push(newObj);
        this.set(STORAGE_KEY_SEARCHES, data);
    }

    removeSearch(index: number) {
        this.remove(index, STORAGE_KEY_SEARCHES);
    }

    removeAllSearches () {
        this.removeAll(STORAGE_KEY_SEARCHES);
    }

    //*********************** Methods for storing Recent Favorites */

    getFavorites () {
        return this.get(STORAGE_KEY_FAVORITES) || [];
    }

    getFavorite (id: number) {
        const data = this.get(STORAGE_KEY_FAVORITES) || [];
        return data[id];
    }

    storeFavorites (favoritesObj: any): void {
        if (this.isItemInFavorites(favoritesObj.id)) return;
        const data = this.get(STORAGE_KEY_FAVORITES) || [];
        data.push(favoritesObj);
        this.set(STORAGE_KEY_FAVORITES, data);
    }

    removeFavorite (index: number): void {
        const data = this.get(STORAGE_KEY_FAVORITES) || [];
        data.splice(index, 1);
        this.set(STORAGE_KEY_FAVORITES, data);
        this.recentSearchChanged.next(this.get(STORAGE_KEY_FAVORITES).slice());
    }

    removeAllFavorites (): void {
        this.removeAll(STORAGE_KEY_FAVORITES);
    }
    
    isItemInFavorites (favObj: any) {
        const favorites = this.get(STORAGE_KEY_FAVORITES) || [];
        if (favorites.length === 0) return false;
        let isItemInFavorites = false;
        for (let favorite of favorites) {
            if (favorite.title === favObj.title) {
                isItemInFavorites = true;
                return isItemInFavorites;
            }
        };
        return isItemInFavorites;
    }

    //** General methods */

    getLength (storageKey: string): number {
        return this.get(storageKey).length;
    }

    isUnique(storageKey: string, obj: Search): boolean {
        const data = this.get(storageKey);
        let isUnique = true;
        for (let search of data) {
            if (search.searchPhrase === obj.searchPhrase && search.propertyType === obj.propertyType) {
                isUnique = false;
                return isUnique;
            }
        };
        return isUnique;
    }

    get (storageKey: string) {
        return this.storage.get(storageKey) || [];
    }

    remove (index: number, storageKey: string): void {
        const data = this.get(storageKey);
        data.splice(index, 1);
        this.set(storageKey, data.slice());
        this.recentSearchChanged.next(this.get(storageKey).slice());
    }

    removeAll (storageKey: string): void {
        this.storage.remove(storageKey);
        this.recentSearchChanged.next([]);
    }

    set (storageKey: string, data: any): void {
        this.storage.set(storageKey, data);
    }
}