import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { LocalStorage } from './utils/localstorage';

import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { BackendService } from "./services/backend.service";
import { InterceptedHttp } from "./utils/http.interceptor";

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, LocalStorage);
}

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: LocalStorage, useValue: window.localStorage },
        AuthGuard, AuthService, BackendService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, LocalStorage]
        }
    ]
})
export class AppModule {
}
