import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'mytrips',
    templateUrl: './mytrips.page.html'
})
export class MyTripsPage {
    constructor(private http: Http) {
        this.http.get("/api/mytrips/test").toPromise().then((response) => {
            console.log(response.json());
        });
    }
}
