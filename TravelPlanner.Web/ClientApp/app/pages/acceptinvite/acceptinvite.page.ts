import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { UserHelper } from "../../utils/helpers";

@Component({
    selector: 'acceptinvite',
    templateUrl: './acceptinvite.page.html'
})
export class AcceptInvitePage implements OnInit {
    constructor(private backendService: BackendService, private route: ActivatedRoute, private router: Router) {
        
    }

    ngOnInit() {
        var inviteId = this.route.snapshot.params["inviteId"];
        this.backendService.acceptInvite(inviteId, UserHelper.getUserId()).then((tripId: number) => {
            this.router.navigate(['/trip/' + tripId]);
        });
    }
}
