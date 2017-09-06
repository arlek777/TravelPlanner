import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripViewModel } from "../../models/trip/trip";
import { BackendService } from "../../services/backend.service";
import { Constants } from "../../models/constants";
import { UserHelper } from "../../utils/helpers";
import { TripRouteViewModel } from "../../models/trip/trip-route";
import { SightObjectViewModel } from "../../models/sight-object";
import { MapObsService } from "../../services/observables/map.service";

@Component({
    selector: 'newtrip',
    templateUrl: './newtrip.page.html'
})
export class NewTripPage implements OnInit {
    newtrip = new TripViewModel();

    constructor(private backendService: BackendService,
        private mapObsService: MapObsService,
        private router: Router) {

        this.newtrip.creatorId = UserHelper.getUserId();
        this.mapObsService.mapBuilt$.subscribe((tripRoute: TripRouteViewModel) => {
            this.newtrip.tripRoute = tripRoute;
        });
    }

    ngOnInit(): void {
        this.backendService.getSights().then((sights: SightObjectViewModel[]) => {
            this.mapObsService.sightObjectsReceived(sights);
        });
    }

    onSubmit() {
        this.backendService.createTrip(this.newtrip).then((id) => {
            this.router.navigate(['/trip/' + id]);
        });
    }
}
