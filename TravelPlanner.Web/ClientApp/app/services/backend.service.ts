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
        return this.http.post("/api/mytrip/create", model).toPromise()
            .then((result) => { return result.json(); });
    }

    removeTrip(tripId: number, userId: string): Promise<boolean> {
        var model = { id: tripId, userId: userId };
        return this.http.post("/api/mytrip/remove", model).toPromise().then(() => { return true; });
    }

    getTrip(id: string, userId: string): Promise<TripViewModel> {
        return this.http.get(`/api/mytrip/get/${id}/${userId}`).toPromise()
            .then((result) => { return new TripViewModel(result.json()); });
    }

    getOwnTrips(userId: string): Promise<TripViewModel[]> {
        return this.http.get(`/api/mytrip/getown/${userId}`).toPromise()
            .then((result) => {
                return result.json();
            });
    }

    // Invites
    sendInvites(model: InvitesModel): Promise<boolean> {
        return this.http.post("/api/invite/send", model).toPromise().then(() => { return true });
    }

    acceptInvite(inviteId: number, userId: string): Promise<number> {
        var model = { inviteId: inviteId, userId: userId };
        return this.http.post("/api/invite/accept", model)
            .toPromise()
            .then((response) => { return parseInt(response.text()); });
    }

    // Messages
    sendMessage(model: MessageModel): Promise<boolean> {
        return this.http.post("/api/message/send", model).toPromise().then(() => { return true });
    }

    getAllMessages(chatId: number): Promise<MessageModel> {
        return this.http.get(`/api/message/getall/${chatId}`)
            .toPromise()
            .then((response) => { return parseInt(response.text()); });
    }
}