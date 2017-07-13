import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TripViewModel } from "../../models/trip";
import { BackendService } from "../../services/backend.service";
import { UserHelper } from "../../utils/helpers";

@Component({
    selector: 'trip',
    templateUrl: './trip.page.html'
})
export class TripPage implements OnInit {
    trip = new TripViewModel();
    newInvite = "";
    invites = new Array<string>();

    constructor(private backendService: BackendService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        var userId = UserHelper.getUserId();
        var tripId = this.route.snapshot.params['id'];
        this.backendService.getTrip(tripId, userId).then((trip) => {
            this.trip = trip;
        });
    }

    addInvite() {
        this.invites.push(this.newInvite);
        this.newInvite = "";
    }

    sendInvites() {
        this.backendService.sendInvites(this.invites).then((users) => {
            this.trip.users = users;
        });
        this.invites = new Array<string>();
    }
}
