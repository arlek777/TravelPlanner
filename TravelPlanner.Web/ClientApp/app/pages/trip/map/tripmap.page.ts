import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './tripmap.page.html'
})
export class TripMapPage {
    isMapReadOnly = false;

    constructor(private route: ActivatedRoute) {
    }
}
