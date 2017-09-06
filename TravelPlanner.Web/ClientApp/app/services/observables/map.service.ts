﻿import { Subject } from "rxjs/Subject";
import { Injectable } from '@angular/core';
import { TripRouteViewModel } from "../../models/trip/trip-route";
import { TripWaypointViewModel } from "../../models/trip/trip-waypoint";
import { SightObjectViewModel } from "../../models/sight-object";

@Injectable()
export class MapObsService {
    private mapBuiltSource = new Subject<TripRouteViewModel>();
    private waypointsReceivedSource = new Subject<TripWaypointViewModel[]>();
    private sightObjectsReceivedSource = new Subject<SightObjectViewModel[]>();

    mapBuilt$ = this.mapBuiltSource.asObservable();
    waypointsReceived$ = this.waypointsReceivedSource.asObservable();
    sightObjectsReceived$ = this.sightObjectsReceivedSource.asObservable();

    mapBuilt(model: TripRouteViewModel) {
        this.mapBuiltSource.next(model);
    }

    waypointsReceived(model: TripWaypointViewModel[]) {
        this.waypointsReceivedSource.next(model);
    }

    sightObjectsReceived(model: SightObjectViewModel[]) {
        this.sightObjectsReceivedSource.next(model);
    }
}