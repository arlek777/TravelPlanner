import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output } from '@angular/core';
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
    @Input() estimatedTime: any;
    @Input() estimatedDistance: any;

    constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

    updateDirections() {
        this.gmapsApi.getNativeMap().then(map => {
            if (!this.originPlaceId || !this.destinationPlaceId) {
                return;
            }

            var directionsService = new google.maps.DirectionsService();
            var me = this;
            var latLngA = new google.maps.LatLng(this.origin.lat, this.origin.lng);
            var latLngB = new google.maps.LatLng(this.destination.lat, this.destination.lng);
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 8,
                    strokeOpacity: 0.7,
                    strokeColor: '#00468c'
                }
            });
            this.directionsDisplay.setDirections({ routes: [] });
            directionsService.route({
                origin: { placeId: this.originPlaceId },
                destination: { placeId: this.destinationPlaceId },
                waypoints: this.waypoints,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response: any, status: any) {
                if (status === 'OK') {
                    me.directionsDisplay.setDirections(response);
                    map.setZoom(30);
                    
                    var point = response.routes[0].legs[0];
                    me.estimatedTime = point.duration.text;
                    me.estimatedDistance = point.distance.text;
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        });

    }

    private getcomputeDistance(latLngA: any, latLngB: any) {
        return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
    }
}