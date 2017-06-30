import { Injectable } from '@angular/core';
import { BackendService } from "./backend.service";
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";

@Injectable()
export class AuthService {
    constructor(private backendService: BackendService) {
    }

    isLoggedIn = false;
    redirectUrl: string;

    login(model: LoginViewModel): Promise<void> {
        return this.backendService.login(model).then(() => { this.isLoggedIn = true; });
    }

    register(model: RegistrationViewModel): Promise<void> {
        return this.backendService.register(model).then(() => { this.isLoggedIn = true; });
    }

    logout(): void {
        this.backendService.logout().then(() => { this.isLoggedIn = false; });
    }
}