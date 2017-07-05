import { Injectable, Inject } from '@angular/core';
import { BackendService } from "./backend.service";
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import { User } from "../models/user";
import { JWTTokens } from "../models/jwttokens";
import { Constants } from "../models/constants";
import { LocalStorage } from '../utils/localstorage';

@Injectable()
export class AuthService {
    constructor(private backendService: BackendService, @Inject(LocalStorage) private localStorage) {
        var localStorageUser = localStorage.getItem(Constants.currentUserKey);
        if (localStorageUser) {
            this.user = JSON.parse(localStorageUser);
        }
    }

    user: User = null;
    isLoggedIn = () => this.user && this.user !== null;
    redirectUrl: string;

    login(model: LoginViewModel): Promise<void> {
        return this.backendService.login(model).then((tokens: JWTTokens) => {
            this.setTokensAndUserToLocalStorage(tokens);
        });
    }

    register(model: RegistrationViewModel): Promise<void> {
        return this.backendService.register(model).then((tokens: JWTTokens) => {
            this.setTokensAndUserToLocalStorage(tokens);
        });
    }

    logout(): void {
        localStorage.removeItem(Constants.accessTokenKey);
        localStorage.removeItem(Constants.currentUserKey);

        this.user = null;
    }

    private setTokensAndUserToLocalStorage(tokens: JWTTokens) {
        var base64UserClaims = tokens.idToken.split(".")[1];
        var user = JSON.parse(atob(base64UserClaims));

        localStorage.setItem(Constants.accessTokenKey, tokens.accessToken);
        localStorage.setItem(Constants.currentUserKey, JSON.stringify(user));
    }
}