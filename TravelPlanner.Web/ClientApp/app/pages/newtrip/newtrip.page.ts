import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripViewModel } from "../../models/trip/trip";
import { BackendService } from "../../services/backend.service";
import { Constants } from "../../models/constants";
import { UserHelper } from "../../utils/helpers";
import { TripRouteViewModel } from "../../models/trip/trip-route";
import { SightObjectViewModel } from "../../models/sight-object";
import { MapComponent } from "../../components/map/map.component";

@Component({
    selector: 'newtrip',
    templateUrl: './newtrip.page.html'
})
export class NewTripPage implements OnInit {
    newtrip = new TripViewModel();
    sights: SightObjectViewModel[] = [];

    constructor(private backendService: BackendService, private router: Router) {
        this.newtrip.creatorId = UserHelper.getUserId();
    }

    ngOnInit(): void {
        this.backendService.getSights().then((sights: SightObjectViewModel[]) => {
            this.markers = sights;
        });
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
