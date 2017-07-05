import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import 'rxjs/add/operator/toPromise';
import { JWTTokens } from "../models/jwttokens";

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
}