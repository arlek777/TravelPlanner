import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TripViewModel } from "../../models/trips/trip";
import { BackendService } from "../../services/backend.service";
import { UserHelper } from "../../utils/helpers";

@Component({
    selector: 'trip',
    templateUrl: './trip.page.html'
})
export class TripPage implements OnInit {
    trip = new TripViewModel();

    constructor(private backendService: BackendService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        var userId = UserHelper.getUserId();
        var tripId = this.route.snapshot.params['id'];
        this.backendService.getTrip(tripId, userId).then((trip) => {
            this.trip = trip;
        });
    }
}
