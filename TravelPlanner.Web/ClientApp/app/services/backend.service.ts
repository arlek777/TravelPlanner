import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import 'rxjs/add/operator/toPromise';
import { JWTTokens } from "../models/jwttokens";
import { Trip } from "../models/trips/trip";

@Injectable()
export class BackendService {
    constructor(private http: Http) {
    }

    login(model: LoginViewModel): Promise<JWTTokens> {
        return this.http.post("/api/auth/login", model).toPromise()
            .then((result) => { return new JWTTokens(result.json()); });
    }

    register(model: RegistrationViewModel): Promise<JWTTokens> {
        return this.http.post("/api/auth/register", model).toPromise()
            .then((result) => { return new JWTTokens(result.json()); });
    }

    createTrip(model: Trip): Promise<string> {
        return this.http.post("/api/mytrips/create", model).toPromise()
            .then((result) => { return result.json(); });
    }

    getTrip(id: string, userId: string): Promise<Trip> {
        return this.http.get(`/api/mytrips/get/${id}/${userId}`).toPromise()
            .then((result) => { return new Trip(result.json()); });
    }
}