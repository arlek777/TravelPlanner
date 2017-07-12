import { Component, OnInit } from '@angular/core';
import { TripViewModel } from "../../models/trips/trip";

@Component({
    selector: 'mytrips',
    templateUrl: './mytrips.page.html'
})
export class MyTripsPage implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
        
    }

    trips: TripViewModel[];
}
