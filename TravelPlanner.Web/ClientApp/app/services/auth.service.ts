import { Injectable } from '@angular/core';
import { BackendService } from "./backend.service";
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import { RequestResult } from "../models/requestresult";

@Injectable()
export class AuthService {
    constructor(private backendService: BackendService) {
    }

    isLoggedIn = false;
    redirectUrl: string;

    login(model: LoginViewModel): Promise<void> {
        return this.backendService.login(model).then((result: RequestResult) => {
            this.isLoggedIn = true;
        }).catch((result) => console.log(result));
    }

    register(model: RegistrationViewModel): Promise<void> {
        return this.backendService.register(model).then((result: RequestResult) => { this.isLoggedIn = true; });
    }

    logout(): void {
        this.backendService.logout().then(() => { this.isLoggedIn = false; });
    }
}