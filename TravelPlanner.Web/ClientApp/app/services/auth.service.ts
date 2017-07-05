﻿import { Injectable, Inject } from '@angular/core';
import { BackendService } from "./backend.service";
import { LoginViewModel } from "../models/auth/login";
import { RegistrationViewModel } from "../models/auth/registration";
import { User } from "../models/user";
import { JWTTokens } from "../models/jwttokens";
import { Constants } from "../models/constants";
import { LocalStorage } from '../utils/localstorage';

@Injectable()
export class AuthService {
    private _accessToken: string;
    private _user:User;

    constructor(private backendService: BackendService, @Inject(LocalStorage) private localStorage) {
    }

    redirectUrl: string;

    get user(): User {
        if (this._user) return this._user;
        var localStorageUser = localStorage.getItem(Constants.currentUserKey);
        if (localStorageUser) {
            this._user = JSON.parse(localStorageUser);
            return this._user;
        }
        return null;
    }

    get accessToken(): string {
        if (this._accessToken) return this._accessToken;
        var localStorageToken = localStorage.getItem(Constants.accessTokenKey);
        if (localStorageToken) {
            this._accessToken = localStorageToken;
            return this._accessToken;
        }
        return null;
    }

    get isLoggedIn() { return this.user && this.accessToken }

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

        this._user = null;
    }

    private setTokensAndUserToLocalStorage(tokens: JWTTokens) {
        var base64UserClaims = tokens.idToken.split(".")[1];
        var user = JSON.parse(atob(base64UserClaims));

        localStorage.setItem(Constants.accessTokenKey, tokens.accessToken);
        localStorage.setItem(Constants.currentUserKey, JSON.stringify(user));
    }
}