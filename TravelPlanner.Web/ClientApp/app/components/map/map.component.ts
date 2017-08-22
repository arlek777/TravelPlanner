import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from "../../services/backend.service";
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { } from 'googlemaps';
import { GoogleMap } from "@agm/core/services/google-maps-types";
import { Mapper } from "../../utils/helpers";
import { DirectionsMapDirective } from "../../directives/map-directions.directive";
import { MapLocation } from "../../models/map-location";

interface IMapMarker {
    id: string;
    lat: number;
    lng: number;
    label: string;
}

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styles: [` agm-map {
            height: 500px;
        }`],
    providers: [GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit {
    private readonly defaultZoom = 7;
    private readonly defaultLng = 50.4501;
    private readonly defaultLat = 30.5234;

    @ViewChild("search")
    searchElementRef: ElementRef;

    @ViewChild(DirectionsMapDirective)
    directionsMapDirective: DirectionsMapDirective;

    markers: IMapMarker[] = [];

    zoom: number = this.defaultZoom;
    lat: number = this.defaultLat;
    lng: number = this.defaultLng;
    mapLocations: MapLocation[] = [];

    constructor(private mapsLoader: MapsAPILoader,
        private backendService: BackendService,
        private ngZone: NgZone) {
    }

    ngOnInit() {
        this.markers = [
            {
                id: "1",
                lat: 50.434479,
                lng: 30.304548,
                label: 'Чайка'
            },
            {
                id: "2",
                lat: 50.231608,
                lng: 30.495089,
                label: 'ЧУб Страусы'
            }
        ];

        this.setCurrentPosition();

        this.mapsLoader.load().then(() => {
            this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer();

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.mapLocations.push({
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
        if (this.mapLocations.length < 2) return;

        this.directionsMapDirective.origin = this.mapLocations[0].latLng;
        this.directionsMapDirective.originPlaceId = this.mapLocations[0].id;

        var destination = this.mapLocations[this.mapLocations.length - 1];

        this.directionsMapDirective.destination = destination.latLng;
        this.directionsMapDirective.destinationPlaceId = destination.id;

        var waypoints: google.maps.DirectionsWaypoint[] = [];
        this.mapLocations.forEach((r) => waypoints.push({ location: r.latLng, stopover: false }));

        this.directionsMapDirective.waypoints = waypoints;
        this.directionsMapDirective.updateDirections();
    }

    clickedMarker(marker: IMapMarker) { // todo work on markers
        this.mapLocations.push({
            id: marker.id,
            latLng: { lat: marker.lat, lng: marker.lng },
            name: marker.label
        });
    }

    onDirectionsDone(info: { time: number, distance: number }) {
        console.log(info);
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.zoom = this.defaultZoom;
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        }
    }
}

