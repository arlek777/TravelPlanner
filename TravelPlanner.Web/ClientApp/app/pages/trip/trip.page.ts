import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TripViewModel } from "../../models/trips/trip";
import { BackendService } from "../../services/backend.service";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'trip',
    templateUrl: './trip.page.html'
})
export class TripPage implements OnInit {
    trip = new TripViewModel();

    constructor(private backendService: BackendService, private authService: AuthService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(param => {
            var userId = this.authService.user.id;
            this.backendService.getTrip(param['id'], userId).then((trip) => {
                this.trip = trip;
            });
        });
    }
}
