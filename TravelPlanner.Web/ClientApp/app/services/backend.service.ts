import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import { User } from "../models/user";
import { JWTTokens } from "../models/auth/jwttokens";
import { TripViewModel } from "../models/trip";
import { InvitesModel } from "../models/invites";

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

    removeTrip(tripId: number, userId: string): Promise<boolean> {
        var model = { id: tripId, userId: userId };
        return this.http.post("/api/mytrips/remove", model).toPromise().then(() => { return true; });
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
    sendInvites(model: InvitesModel): Promise<boolean> {
        return this.http.post("/api/invites/send", model).toPromise().then(() => { return true });
    }

    acceptInvite(inviteId: number, userId: string): Promise<number> {
        var model = { inviteId: inviteId, userId: userId };
        return this.http.post("/api/invites/accept", model)
            .toPromise()
            .then((response) => { return parseInt(response.text()); });
    }
}