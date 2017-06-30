import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";

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
        return Promise.resolve(true);
    }
}