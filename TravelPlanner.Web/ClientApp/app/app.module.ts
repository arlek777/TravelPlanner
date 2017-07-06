import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { BackendService } from "./services/backend.service";
import { InterceptedHttp } from "./utils/http.interceptor";

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { HomePage } from './pages/home/home.page';
import { MyTripsPage } from './pages/mytrips/mytrips.page';
import { InvitedTripsPage } from './pages/invitedtrips/invitedtrips.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomePage,
        MyTripsPage,
        InvitedTripsPage,
        LoginPage,
        RegisterPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePage },
            { path: 'mytrips', component: MyTripsPage, canActivate: [AuthGuard] },
            { path: 'invitedtrips', component: InvitedTripsPage, canActivate: [AuthGuard] },
            { path: 'login', component: LoginPage },
            { path: 'register', component: RegisterPage },
            { path: '**', redirectTo: 'home' }
        ]),
        FormsModule
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        AuthGuard,
        AuthService,
        BackendService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }]
})
export class AppModule {
}