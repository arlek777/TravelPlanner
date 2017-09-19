import { Component } from '@angular/core';
import { InvitesViewModel } from "../../models/invites";
import { BackendService } from "../../services/backend.service";
import { NotificationObsService } from "../../services/observables/notification.service";
import { UserHelper } from "../../utils/helpers";
import { TripViewModel } from "../../models/trip/trip";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'trip-participants',
    templateUrl: './tripparticipants.component.html'
})
export class TripParticipantsComponent {
    trip: TripViewModel = new TripViewModel();
    newPhone = "";
    invitePhones = new Array<string>();

    constructor(private backendService: BackendService,
        private notificationObsService: NotificationObsService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.backendService.getTrip(this.route.parent.snapshot.params["id"], UserHelper.getUserId())
            .then((trip:
                TripViewModel) => {
                this.trip = trip;
            });
    }

    addInvite() {
        this.invitePhones.push(this.newPhone);
        this.newPhone = "";
    }

    sendInvites() {
        var model = new InvitesViewModel({
            invitorUserId: UserHelper.getUserId(),
            tripId: this.trip.id,
            phones: this.invitePhones
        });
        this.backendService.sendInvites(model).then(() => {
            this.notificationObsService.success.next("invitesSent");
        });
        this.invitePhones = new Array<string>();
    }
}
