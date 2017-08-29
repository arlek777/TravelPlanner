import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TripViewModel } from "../../models/trip";
import { BackendService } from "../../services/backend.service";
import { Constants } from "../../models/constants";
import { UserHelper } from "../../utils/helpers";
import { TripRouteViewModel } from "../../models/trip-route";

@Component({
    selector: 'newtrip',
    templateUrl: './newtrip.page.html'
})
export class NewTripPage {
    newtrip = new TripViewModel();

    constructor(private backendService: BackendService, private router: Router) {
        this.newtrip.creatorId = UserHelper.getUserId();
    }

    onSubmit() {
        this.backendService.createTrip(this.newtrip).then((id) => {
            this.router.navigate(['/trip/' + id]);
        });
    }

    onRouteBuilt(tripRoute: TripRouteViewModel) {
        this.newtrip.tripRoute = tripRoute;
    }
}
