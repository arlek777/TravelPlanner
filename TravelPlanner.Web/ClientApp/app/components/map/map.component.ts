import { Component, NgZone, OnInit, OnChanges, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from "../../services/backend.service";
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { } from 'googlemaps';
import { GoogleMap } from "@agm/core/services/google-maps-types";
import { Mapper } from "../../utils/helpers";
import { DirectionsMapDirective } from "../../directives/map-directions.directive";
import { TripWaypointViewModel } from "../../models/trip/trip-waypoint";
import { TripRouteViewModel } from "../../models/trip/trip-route";
import { SightObjectViewModel } from "../../models/sight-object";
import { MapDirectionsService } from "../../services/observables/map-directions.service";

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styles: [` agm-map {
            height: 500px;
        }`],
    providers: [GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit, OnChanges  {
    private readonly defaultZoom = 7;
    private readonly defaultLng = 50.4501;
    private readonly defaultLat = 30.5234;

    @Input() waypoints: TripWaypointViewModel[] = [];
    @Input() markers: SightObjectViewModel[] = [];

    @Output() onRouteBuilt = new EventEmitter<TripRouteViewModel>();

    @ViewChild("search")
    searchElementRef: ElementRef;

    placeAutocomplete: google.maps.places.Autocomplete;

    zoom: number = this.defaultZoom;
    lat: number = this.defaultLat;
    lng: number = this.defaultLng;
    infoWindowOpened = null;
    updateWaypointIndex = -1;

    constructor(private mapsLoader: MapsAPILoader,
        private backendService: BackendService,
        private ngZone: NgZone,
        private mapDirectionsService: MapDirectionsService) {

        this.mapDirectionsService.directionDone$.subscribe((direction) => {
            this.onRouteBuilt.emit({
                id: 0,
                distance: direction.distance,
                tripWaypoints: this.waypoints,
                time: direction.time
            });
        });
    }

    ngOnInit() {
        this.setCurrentPosition(); 
        this.mapsLoader.load().then(() => {
            this.placeAutocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            //this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer();
            this.placeAutocomplete.addListener("place_changed", () => this.placeSelected());

            if (this.waypoints.length >= 2) {
                this.getDirections();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.waypoints = changes["waypoints"].currentValue;
        this.markers = changes["markers"].currentValue;
    }

    getDirections() {
        if (this.waypoints.length < 2) return;

        this.closeInfoWindow();

        var origin = this.waypoints[0].latLng; // first location
        var destination = this.waypoints[this.waypoints.length - 1].latLng; // last location

        var googleWaypoints: google.maps.DirectionsWaypoint[] = []; 
        // set waypoints if there are more then 2 locations
        if (this.waypoints.length > 2) {
            this.waypoints.forEach((r) => googleWaypoints.push({ location: r.latLng, stopover: false }));
        }
   
        this.mapDirectionsService.requestDirection({
            origin: origin,
            destination: destination,
            waypoints: googleWaypoints
        });
    }

    updateWaypoint(waypoint: TripWaypointViewModel, index: number) {
        this.searchElementRef.nativeElement.value = waypoint.name;
        this.updateWaypointIndex = index;
    }

    removeWaypoint(waypoint: TripWaypointViewModel, index: number) {
        this.waypoints.splice(index, 1);
        // remove from db
    }

    clearDirections() {
        this.waypoints = [];
        this.mapDirectionsService.clearDirection();
        this.setCurrentPosition();
    }

    clickedMarker(marker: SightObjectViewModel, infoWindow) { 
        this.closeInfoWindow();
        this.infoWindowOpened = infoWindow;

        setTimeout(() => this.closeInfoWindow(), 5000);
        if (!this.isWaypointUnique(marker.label)) return;

        this.waypoints.push({
            id: marker.id,
            tripRouteId: 0,
            latLng: marker.latLng,
            name: marker.label
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
                    id: "",
                    tripRouteId: 0,
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

