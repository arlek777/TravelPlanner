import { Component, OnInit } from '@angular/core';
import { Trip } from "../../models/trips/trip";

@Component({
    selector: 'mytrips',
    templateUrl: './mytrips.page.html'
})
export class MyTripsPage implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
        
    }

    trips: Trip[];
}
