import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendService {
    constructor(private http: Http) {
    }

    login(model: LoginViewModel): Promise<boolean> {
        return Promise.resolve(true);
    }

    logout(): Promise<boolean> {
        return Promise.resolve(true);
    }

    register(model: RegistrationViewModel): Promise<boolean> {
        return this.http.post("/api/auth/register", model).toPromise().then((result) => {
            console.log(result);
            return true;
        });
    }
}