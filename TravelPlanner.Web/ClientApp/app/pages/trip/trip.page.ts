import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TripViewModel } from "../../models/trip";
import { InvitesModel } from "../../models/invites";
import { BackendService } from "../../services/backend.service";
import { AuthService } from "../../services/auth.service";
import { UserHelper } from "../../utils/helpers";
import { User } from "../../models/user";

@Component({
    selector: 'trip',
    templateUrl: './trip.page.html'
})
export class TripPage implements OnInit {
    private currentUser: User = null;

    constructor(private backendService: BackendService, private route: ActivatedRoute, private authService: AuthService) {
    }

    trip = new TripViewModel();
    newPhone = "";
    invitePhones = new Array<string>();

    ngOnInit() {
        this.currentUser = this.authService.user;
        var tripId = this.route.snapshot.params['id'];
        this.backendService.getTrip(tripId, this.currentUser.id).then((trip) => {
            this.trip = trip;
        });
    }

    addInvite() {
        this.invitePhones.push(this.newPhone);
        this.newPhone = "";
    }

    sendInvites() {
        var model = new InvitesModel(this.invitePhones, this.currentUser.id, this.currentUser.userName, this.trip.id);
        this.backendService.sendInvites(model).then(() => {
            alert("Done");
        });
        this.invitePhones = new Array<string>();
    }
}
