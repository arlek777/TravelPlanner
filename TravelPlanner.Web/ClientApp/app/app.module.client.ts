import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';

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
        AuthService,
        AuthGuard,
        BackendService
    ]
})
export class AppModule {
}
