import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { } from 'googlemaps';
import { RequestDirectionObsModel, MapDirectionsService } from "../services/observables/map-directions.service";

@Directive({
    selector: 'map-directions'
})
export class DirectionsMapDirective {
    directionsDisplay: any = new google.maps.DirectionsRenderer();

    private requestDirection: RequestDirectionObsModel = null;

    constructor(private gmapsApi: GoogleMapsAPIWrapper, private mapDirectionService: MapDirectionsService) {
        this.mapDirectionService.requestDirection$.subscribe((request) => {
            this.requestDirection = request;
        });

        this.mapDirectionService.clearDirection$.subscribe(() => {
            this.clearDirections();
        })
    }

    getDirections() {
        this.gmapsApi.getNativeMap().then(map => {
            var directionsService = new google.maps.DirectionsService();
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setDirections({ routes: [] });

            directionsService.route({
                origin: this.requestDirection.origin,
                destination: this.requestDirection.destination,
                waypoints: this.requestDirection.waypoints,
                travelMode: google.maps.TravelMode.DRIVING
            }, (resp, status) => this.onDirectionsReceived(resp, status, this));
        });

    }

    clearDirections() {
        this.directionsDisplay.setDirections({ routes: [] });
    }

    private onDirectionsReceived(response: any, status: any, that: DirectionsMapDirective) {
        if (status === 'OK') {
            that.directionsDisplay.setDirections(response);

            var point = response.routes[0].legs[0];
            var estimatedTime = point.duration.text;
            var estimatedDistance = point.distance.text;

            that.mapDirectionService.directionDone({ time: estimatedTime, distance: estimatedDistance });
        } else {
            console.log('Directions request failed due to ' + status);
        }
    }

    private getcomputeDistance(latLngA: any, latLngB: any) {
        return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
    }
}