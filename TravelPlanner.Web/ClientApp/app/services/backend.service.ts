import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BackendService {
    constructor(private http: Http) {
    }

    login(email, password): Promise<boolean> {
        return Promise.resolve(true);
    }

    logout(): Promise<boolean> {
        return Promise.resolve(true);
    }

    register(): Promise<boolean> {
        return Promise.resolve(true);
    }
}