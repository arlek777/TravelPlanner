import { Mapper } from "../utils/helpers";

export class TripWaypoint {
    constructor(wapypoint?: TripWaypoint) {
        Mapper.map(wapypoint, this);
    }

    public id: string;
    public latLng: google.maps.LatLngLiteral;
    public name: string;
}