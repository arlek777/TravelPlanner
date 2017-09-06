import { Component, NgZone, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { MapsAPILoader, GoogleMapsAPIWrapper, AgmMap } from '@agm/core';
import { } from 'googlemaps';
import { GoogleMap } from "@agm/core/services/google-maps-types";
import { TripWaypointViewModel } from "../../models/trip/trip-waypoint";
import { TripRouteViewModel } from "../../models/trip/trip-route";
import { SightObjectViewModel } from "../../models/sight-object";
import { MapObsService } from "../../services/observables/map.service";

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styles: [` agm-map {
            height: 500px;
        }`],
    providers: [GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit, AfterViewInit  {
    private readonly defaultZoom = 7;
    private readonly defaultLng = 50.4501;
    private readonly defaultLat = 30.5234;

    private zoom: number = this.defaultZoom;
    private lat: number = this.defaultLat;
    private lng: number = this.defaultLng;
    private infoWindowOpened = null;
    private updateWaypointIndex = -1;

    private waypoints: TripWaypointViewModel[] = [];
    private markers: SightObjectViewModel[] = [];

    @ViewChild("search")
    private searchElementRef: ElementRef;

    @ViewChild(AgmMap)
    private agmMap: AgmMap;

    private placeAutocomplete: google.maps.places.Autocomplete;
    private directionsDisplay: any = null;

    constructor(private mapsLoader: MapsAPILoader,
        private gmapsApi: GoogleMapsAPIWrapper,
        private backendService: BackendService,
        private ngZone: NgZone,
        private mapObsService: MapObsService) {

        this.mapObsService.sightObjectsReceived$.subscribe((sights) => {
            this.markers = sights;
        });

        this.mapObsService.waypointsReceived$.subscribe((waypoints) => {
            this.waypoints = waypoints;
            if (this.waypoints.length >= 2) {
                this.getDirections();
            }
        });
    }

    ngOnInit() {
        this.setCurrentPosition(); 
        this.mapsLoader.load().then(() => {
            this.placeAutocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.placeAutocomplete.addListener("place_changed", () => this.placeSelected());
        });
    }

    ngAfterViewInit() {
        this.agmMap.mapReady.subscribe(map => {
            this.directionsDisplay.setMap(map);
        });
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
   
        this.routeDirections({
            destination: destination,
            origin: origin,
            waypoints: googleWaypoints
        });
    }

    clearDirections() {
        this.waypoints = [];
        this.directionsDisplay.setDirections({ routes: [] });
        this.setCurrentPosition();
    }

    addWaypoint(marker: SightObjectViewModel, infoWindow) {
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

    updateWaypoint(waypoint: TripWaypointViewModel, index: number) {
        this.searchElementRef.nativeElement.value = waypoint.name;
        this.updateWaypointIndex = index;
    }

    removeWaypoint(waypoint: TripWaypointViewModel, index: number) {
        this.waypoints.splice(index, 1);
        // remove from db
    }

    private routeDirections(requestDirection: { origin, destination, waypoints }) {
        var directionsService = new google.maps.DirectionsService();
        
        this.directionsDisplay.setDirections({ routes: [] });

        directionsService.route({
                origin: requestDirection.origin,
                destination: requestDirection.destination,
                waypoints: requestDirection.waypoints,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (resp, status) => this.onDirectionsReceived(resp, status, this));
    }

    private onDirectionsReceived(response: any, status: any, that: MapComponent) {
        if (status === 'OK') {
            that.directionsDisplay.setDirections(response);

            var point = response.routes[0].legs[0];
            var estimatedTime = point.duration.text;
            var estimatedDistance = point.distance.text;

            that.mapObsService.mapBuilt({
                id: 0,
                distance: estimatedDistance,
                time: estimatedTime,
                tripWaypoints: that.waypoints
            });
        } else {
            console.log('Directions request failed due to ' + status);
        }
    }

    private placeSelected() {
        this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = this.placeAutocomplete.getPlace();
            var placeName = place.address_components[0].short_name;

            if (place.geometry === undefined || place.geometry === null || !this.isWaypointUnique(placeName)) {
                return;
            }

            // if not update mode
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

