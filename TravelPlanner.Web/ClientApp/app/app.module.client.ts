import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { LocalStorage } from './utils/localstorage';

import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { BackendService } from "./services/backend.service";

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
        AuthGuard, AuthService, BackendService
    ]
})
export class AppModule {
}
