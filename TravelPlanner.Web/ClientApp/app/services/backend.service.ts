import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import 'rxjs/add/operator/toPromise';
import { RequestResult } from "../models/requestresult";

@Injectable()
export class BackendService {
    constructor(private http: Http) {
    }

    login(model: LoginViewModel): Promise<RequestResult> {
        return this.http.post("/api/auth/login", model).toPromise()
            .then((result) => { return result.json(); })
            .catch((result) => { return Promise.reject(result.json()); });
    }

    logout(): Promise<boolean> {
        return Promise.resolve(true);
    }

    register(model: RegistrationViewModel): Promise<RequestResult> {
        return this.http.post("/api/auth/register", model).toPromise()
            .then((result) => { return result.json(); })
            .catch((result) => { return result });
    }
}