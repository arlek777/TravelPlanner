import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { } from 'googlemaps';

@Directive({
    selector: 'map-directions'
})
export class DirectionsMapDirective {
    @Input() origin: google.maps.LatLngLiteral;
    @Input() destination: google.maps.LatLngLiteral;
    @Input() originPlaceId: string;
    @Input() destinationPlaceId: string;
    @Input() waypoints: google.maps.DirectionsWaypoint[];
    @Input() directionsDisplay: any;

    @Output() onDirectionsDone = new EventEmitter<{ time: number, distance: number }>();

    constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

    updateDirections() {
        this.gmapsApi.getNativeMap().then(map => {
            if (!this.originPlaceId || !this.destinationPlaceId) {
                return;
            }

            var directionsService = new google.maps.DirectionsService();
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setDirections({ routes: [] });

            directionsService.route({
                origin: { placeId: this.originPlaceId },
                destination: { placeId: this.destinationPlaceId },
                waypoints: this.waypoints,
                travelMode: google.maps.TravelMode.DRIVING
            }, (resp, status) => this.onDirectionsReceived(resp, status, this));
        });

    }

    private onDirectionsReceived(response: any, status: any, that: DirectionsMapDirective) {
        if (status === 'OK') {
            that.directionsDisplay.setDirections(response);

            var point = response.routes[0].legs[0];
            var estimatedTime = point.duration.text;
            var estimatedDistance = point.distance.text;

            that.onDirectionsDone.emit({ time: estimatedTime, distance: estimatedDistance });
        } else {
            console.log('Directions request failed due to ' + status);
        }
    }

    private getcomputeDistance(latLngA: any, latLngB: any) {
        return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
    }
}