import { Injectable } from '@angular/core';
import { BackendService } from "./backend.service";

@Injectable()
export class AuthService {
    constructor(private backendService: BackendService) {
    }


    isLoggedIn = false;
    redirectUrl: string;

    login(): Promise<boolean> {
        return this.backendService.login("", "").then(() => { this.isLoggedIn = true; return true; });
    }

    register(): Promise<boolean> {
        return this.backendService.register().then(() => { this.isLoggedIn = true; return true; });
    }

    logout(): void {
        this.backendService.logout().then(() => { this.isLoggedIn = false; });
    }
}