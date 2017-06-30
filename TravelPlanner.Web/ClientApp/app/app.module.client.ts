import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';

import { AuthGuard } from "./services/auth-guard.service";
import { UnauthGuard } from "./services/unauth-guard.service";
import { AuthService } from "./services/auth.service";
import { BackendService } from "./services/backend.service";

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        AuthGuard,
        UnauthGuard,
        AuthService,
        BackendService
    ]
})
export class AppModule {
}
