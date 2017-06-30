import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { HomePage } from './pages/home/home.page';
import { MyTripsPage } from './pages/mytrips/mytrips.page';
import { InvitedTripsPage } from './pages/invitedtrips/invitedtrips.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

import { AuthGuard } from "./services/auth-guard.service";
import { UnauthGuard } from "./services/unauth-guard.service";

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
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
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePage },
            { path: 'mytrips', component: MyTripsPage, canActivate: [AuthGuard] },
            { path: 'invitedtrips', component: InvitedTripsPage, canActivate: [AuthGuard] },
            { path: 'login', component: LoginPage, canActivate: [UnauthGuard] },
            { path: 'register', component: RegisterPage, canActivate: [UnauthGuard] },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
