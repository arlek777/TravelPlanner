import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TripViewModel } from "../../models/trip";
import { InvitesViewModel } from "../../models/invites";
import { BackendService } from "../../services/backend.service";
import { AuthService } from "../../services/auth.service";
import { UserHelper } from "../../utils/helpers";
import { User } from "../../models/user";
import { Car } from "../../models/car";
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'trip',
    templateUrl: './trip.page.html'
})
export class TripPage implements OnInit {
    private currentUser: User = null;

    constructor(private backendService: BackendService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private sanitizer: DomSanitizer) {
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

    getMapIframe() {
        return this.sanitizer.bypassSecurityTrustHtml(this.trip.mapUrl);
    }

    addInvite() {
        this.invitePhones.push(this.newPhone);
        this.newPhone = "";
    }
    sendInvites() {
        var model = new InvitesViewModel({
            invitorUserId: this.currentUser.id,
            invitorUserName: this.currentUser.userName,
            tripId: this.trip.id,
            phones: this.invitePhones
        });
        this.backendService.sendInvites(model).then(() => {
            alert("Done");
        });
        this.invitePhones = new Array<string>();
    }
}
