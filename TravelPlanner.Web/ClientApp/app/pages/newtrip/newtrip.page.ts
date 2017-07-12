import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripViewModel } from "../../models/trips/trip";
import { BackendService } from "../../services/backend.service";
import { Constants } from "../../models/constants";
import { UserHelper } from "../../utils/helpers";

@Component({
    selector: 'newtrip',
    templateUrl: './newtrip.page.html'
})
export class NewTripPage {
    model = new TripViewModel();

    constructor(private backendService: BackendService, private router: Router) {
        this.model.creatorId = UserHelper.getUserId();
    }

    onSubmit() {
        this.backendService.createTrip(this.model).then((id) => {
            this.router.navigate(['/trip/' + id]);
        });
    }
}
