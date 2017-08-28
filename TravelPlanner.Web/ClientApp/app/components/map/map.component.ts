﻿import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from "../../services/backend.service";
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { } from 'googlemaps';
import { GoogleMap } from "@agm/core/services/google-maps-types";
import { Mapper } from "../../utils/helpers";
import { DirectionsMapDirective } from "../../directives/map-directions.directive";
import { TripWaypoint } from "../../models/trip-waypoint";

interface IMapMarker {
    id?: string;
    latLng: google.maps.LatLngLiteral;
    label?: string;
}
// TODO find a way to update map after directions changed
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

    placeAutocomplete: google.maps.places.Autocomplete;

    markers: IMapMarker[] = [];
    waypoints: TripWaypoint[] = [];

    zoom: number = this.defaultZoom;
    lat: number = this.defaultLat;
    lng: number = this.defaultLng;
    infoWindowOpened = null;
    updateWaypointIndex = -1;

    constructor(private mapsLoader: MapsAPILoader,
        private backendService: BackendService,
        private ngZone: NgZone) {
    }

    ngOnInit() {
        this.markers = [
            {
                latLng: { lat: 50.434479, lng: 30.304548 },
                label: 'Чайка'
            },
            {
                latLng: { lat: 50.231608, lng: 30.495089 },
                label: 'ЧУб Страусы'
            }
        ];

        this.setCurrentPosition(); 
        this.reloadMap();
    }

    getDirections() {
        if (this.waypoints.length < 2) return;

        this.closeInfoWindow();

        this.directionsMapDirective.origin = this.waypoints[0].latLng; // first location
        this.directionsMapDirective.destination = this.waypoints[this.markers.length - 1].latLng; // last location

        // set waypoints if there are more then 2 locations
        if (this.waypoints.length > 2) {
            var waypoints: google.maps.DirectionsWaypoint[] = [];
            this.waypoints.forEach((r) => waypoints.push({ location: r.latLng, stopover: false }));
            this.directionsMapDirective.waypoints = waypoints;
        }
   
        this.directionsMapDirective.updateDirections();
    }

    updateWaypoint(waypoint: TripWaypoint, index: number) {
        this.searchElementRef.nativeElement.value = waypoint.name;
        this.updateWaypointIndex = index;
        this.reloadMap();
    }

    removeWaypoint(waypoint: TripWaypoint, index: number) {
        this.waypoints.splice(index, 1);
        // remove from db
        this.reloadMap();
        this.directionsMapDirective.clearDirections();
    }

    clearDirections() {
        this.waypoints = [];
        this.reloadMap();
    }

    clickedMarker(marker: IMapMarker, infoWindow) { 
        this.closeInfoWindow();
        this.infoWindowOpened = infoWindow;

        setTimeout(() => this.closeInfoWindow(), 3000);
        if (!this.isWaypointUnique(marker.label)) return;

        this.waypoints.push({
            id: marker.id,
            latLng: marker.latLng,
            name: marker.label
        });
    }

    onDirectionsDone(info: { time: number, distance: number }) {
        console.log(info);
    }

    private reloadMap() {
        this.mapsLoader.load().then(() => {
            this.placeAutocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer();
            this.placeAutocomplete.addListener("place_changed", this.placeSelected);
        });
    }

    private placeSelected() {
        this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = this.placeAutocomplete.getPlace();
            var placeName = place.address_components[0].short_name;

            if (place.geometry === undefined || place.geometry === null || !this.isWaypointUnique(placeName)) {
                return;
            }

            if (this.updateWaypointIndex !== -1) {
                this.waypoints[this.updateWaypointIndex].id = place.place_id;
                this.waypoints[this.updateWaypointIndex].latLng = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                this.waypoints[this.updateWaypointIndex].name = placeName;

                this.updateWaypointIndex = -1;
            } else {
                this.waypoints.push({
                    id: place.place_id,
                    latLng: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
                    name: placeName
                });
            }
            this.searchElementRef.nativeElement.value = "";
        });
    }

    private isWaypointUnique(name) {
        var isUnique = this.waypoints.every((waypoint) => {
            return waypoint.name !== name;
        });

        return isUnique;
    }

    private closeInfoWindow() {
        if (this.infoWindowOpened !== null)
            this.infoWindowOpened.close();
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
