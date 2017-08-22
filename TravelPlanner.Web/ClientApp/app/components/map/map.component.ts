import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from "../../services/backend.service";
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { } from 'googlemaps';
import { GoogleMap } from "@agm/core/services/google-maps-types";
import { Mapper } from "../../utils/helpers";
import { DirectionsMapDirective } from "../../directives/map-directions.directive";

export class RouteLocation {
    constructor(routeLocation?: RouteLocation) {
        Mapper.map(routeLocation, this);
    }

    public id: string;
    public latLng: google.maps.LatLngLiteral;
    public name: string;
}

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styles: [` agm-map {
            height: 800px;
        }`],
    providers: [GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit {
    @ViewChild("search")
    public searchElementRef: ElementRef;

    @ViewChild(DirectionsMapDirective)
    directionsMapDirective: DirectionsMapDirective;

    public zoom: number;
    public defaultLat: number;
    public defaultLong: number;
    public routeLocations: RouteLocation[] = [];

    constructor(private mapsLoader: MapsAPILoader,
        private backendService: BackendService,
        private ngZone: NgZone) {
    }

    ngOnInit() {
        this.defaultLat = 50.4501;
        this.defaultLong = 30.5234;
        this.zoom = 20;

        this.setCurrentPosition();

        this.mapsLoader.load().then(() => {
            this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer();

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.routeLocations.push({
                        id: place.place_id,
                        latLng: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
                        name: place.address_components[0].short_name
                    });
                    this.searchElementRef.nativeElement.value = "";
                });
            });
        });
    }

    getDirections() {
        if (this.routeLocations.length < 2) return;

        this.directionsMapDirective.origin = this.routeLocations[0].latLng;
        this.directionsMapDirective.originPlaceId = this.routeLocations[0].id;

        var destination = this.routeLocations[this.routeLocations.length - 1];

        this.directionsMapDirective.destination = destination.latLng;
        this.directionsMapDirective.destinationPlaceId = destination.id;

        var waypoints: google.maps.DirectionsWaypoint[] = [];
        this.routeLocations.forEach((r) => waypoints.push({ location: r.latLng, stopover: false }));

        this.directionsMapDirective.waypoints = waypoints;
        this.directionsMapDirective.updateDirections();
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.defaultLat = position.coords.latitude;
                this.defaultLong = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}

