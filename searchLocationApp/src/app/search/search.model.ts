export class Search {
    public searchPhrase: string;
    public propertyType: string;

    constructor (searchPhrase: string, propertyType:string) {
        this.searchPhrase = searchPhrase;
        this.propertyType = propertyType;
    }
}