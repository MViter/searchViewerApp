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
    public coords: {latitude: number, longitude: number};

    constructor (propertyType:string, coords: Coords) {
        this.propertyType = propertyType;
        this.coords.latitude = coords.latitude;
        this.coords.longitude = coords.longitude;
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