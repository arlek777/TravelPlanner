import { Mapper } from "../utils/helpers";

export class MapLocation {
    constructor(location?: MapLocation) {
        Mapper.map(location, this);
    }

    public id: string;
    public latLng: google.maps.LatLngLiteral;
    public name: string;
}