export class Search {
    public propertyType: string;
    public searchPhrase: string;

    constructor (searchPhrase: string, propertyType:string, coords:{}) {
        this.searchPhrase = searchPhrase;
        this.propertyType = propertyType;
    }
}

export class SearchByCoords {
    public propertyType: string;
    public coords: Coords;

    constructor (propertyType:string, coords: Coords) {
        this.propertyType = propertyType;
        this.coords = coords;
    }
}

export class Coords {
    latitude: number;
    longitude: number;

    constructor (latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}