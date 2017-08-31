import { Subject } from "rxjs/Subject";
import { Injectable } from '@angular/core';

export class RequestDirectionObsModel {
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
    waypoints: google.maps.DirectionsWaypoint[];
}

@Injectable()
export class MapDirectionsService {
    private requestDirectionSource = new Subject<RequestDirectionObsModel>();
    private directionDoneSource = new Subject<{ time: string, distance: string }>();
    private clearDirectionSource = new Subject();

    requestDirection$ = this.requestDirectionSource.asObservable();
    directionDone$ = this.directionDoneSource.asObservable();
    clearDirection$ = this.clearDirectionSource.asObservable();

    requestDirection(model: RequestDirectionObsModel) {
        this.requestDirectionSource.next(model);
    }

    directionDone(model: { time: string, distance: string }) {
        this.directionDoneSource.next(model);
    }

    clearDirection() {
        this.clearDirectionSource.next();
    }
}
