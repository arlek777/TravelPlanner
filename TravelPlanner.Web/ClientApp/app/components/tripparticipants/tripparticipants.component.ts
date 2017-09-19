import { Component, Input } from '@angular/core';
import { InvitesViewModel } from "../../models/invites";
import { BackendService } from "../../services/backend.service";
import { NotificationObsService } from "../../services/observables/notification.service";
import { UserHelper } from "../../utils/helpers";

@Component({
    selector: 'trip-participants',
    templateUrl: './tripparticipants.component.html'
})
export class TripParticipantsComponent {
    @Input() tripId;

    newPhone = "";
    invitePhones = new Array<string>();

    constructor(private backendService: BackendService,
        private notificationObsService: NotificationObsService) {
    }

    addInvite() {
        this.invitePhones.push(this.newPhone);
        this.newPhone = "";
    }

    sendInvites() {
        var model = new InvitesViewModel({
            invitorUserId: UserHelper.getUserId(),
            tripId: this.tripId,
            phones: this.invitePhones
        });
        this.backendService.sendInvites(model).then(() => {
            this.notificationObsService.success.next("invitesSent");
        });
        this.invitePhones = new Array<string>();
    }
}
