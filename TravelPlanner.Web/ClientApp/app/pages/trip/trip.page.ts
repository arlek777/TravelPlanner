import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TripViewModel } from "../../models/trip/trip";
import { BackendService } from "../../services/backend.service";
import { AuthService } from "../../services/auth.service";
import { UserHelper } from "../../utils/helpers";
import { User } from "../../models/user";
import { Car } from "../../models/car";
import { Observable } from "rxjs/Rx";
import { MapObsService } from "../../services/observables/map.service";
import { Subject } from "rxjs/Subject";
import { TripRouteViewModel } from "../../models/trip/trip-route";

@Component({
    selector: 'trip',
    templateUrl: './trip.page.html'
})
export class TripPage implements OnInit, OnDestroy {
    private currentUser: User = null;

    trip = new TripViewModel();

    editedTrip = new TripViewModel();
    editedRoute = new TripRouteViewModel();
    isEditAllowed = false;
    isMainInfoEditMode = false;
    isRouteEditMode = false;

    private unsubscribe = new Subject<any>();

    constructor(private backendService: BackendService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private mapObsService: MapObsService) {

        this.mapObsService.mapBuilt$
            .takeUntil(this.unsubscribe)
            .subscribe((tripRoute: TripRouteViewModel) => {
                this.trip.tripRoute = tripRoute;
            });
    }

    ngOnInit() {
        this.currentUser = this.authService.user;
        var tripId = this.route.snapshot.params['id'];
        this.backendService.getTrip(tripId, this.currentUser.id).then((trip: TripViewModel) => {
            this.trip = trip;
            if (trip.tripRoute) {
                this.mapObsService.waypointsReceived(trip.tripRoute.tripWaypoints);
            }
        });
    }

    editTrip() {
        this.editedTrip = this.trip;
        this.isMainInfoEditMode = true;
    }

    cancelEdit() {
        this.editedTrip = null;
        this.isMainInfoEditMode = false;
    }

    updateMainInfo() {
        this.trip.title = this.editedTrip.title;
        this.trip.description = this.editedTrip.description;

        // todo update trip in db

        this.editedTrip = null;
        this.isMainInfoEditMode = false;
    }

    editRoute() {
        this.editedRoute = this.trip.tripRoute;
        this.isRouteEditMode = true;
    }

    cancelRouteEdit() {
        this.trip.tripRoute = this.editedRoute;
        this.editedRoute = null;
        this.isRouteEditMode = false;
    }

    updateRoute() {
        this.editedRoute = null;
        this.isRouteEditMode = false;

        // todo update in db
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
