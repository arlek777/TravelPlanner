import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import { User } from "../models/user";
import { JWTTokens } from "../models/auth/jwttokens";
import { TripViewModel } from "../models/trip";

@Injectable()
export class BackendService {
    constructor(private http: Http) {
    }

    // Auth
    login(model: LoginViewModel): Promise<JWTTokens> {
        return this.http.post("/api/auth/login", model).toPromise()
            .then((result) => { return new JWTTokens(result.json()); });
    }

    register(model: RegistrationViewModel): Promise<JWTTokens> {
        return this.http.post("/api/auth/register", model).toPromise()
            .then((result) => { return new JWTTokens(result.json()); });
    }

    // Trip
    createTrip(model: TripViewModel): Promise<string> {
        return this.http.post("/api/mytrips/create", model).toPromise()
            .then((result) => { return result.json(); });
    }

    getTrip(id: string, userId: string): Promise<TripViewModel> {
        return this.http.get(`/api/mytrips/get/${id}/${userId}`).toPromise()
            .then((result) => { return new TripViewModel(result.json()); });
    }

    getOwnTrips(userId: string): Promise<TripViewModel[]> {
        return this.http.get(`/api/mytrips/getown/${userId}`).toPromise()
            .then((result) => {
                return result.json();
            });
    }

    // Invites
    sendInvites(model: string[]): Promise<User[]> {
        return this.http.post("/api/invites/send", model).toPromise()
            .then((result) => { return result.json(); });
    }
}