import { NgModule, Inject, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';

import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { BackendService } from "./services/backend.service";
import { ChatService } from "./services/chat.service";
import { WebSocketService } from "./services/websocket.service";
import { InterceptedHttp } from "./utils/http.interceptor";
import { GlobalErrorHandler } from "./services/global-error-handler.service";

import { NotificationObsService } from "./services/observables/notification.service";
import { MapObsService } from "./services/observables/map.service";

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ChatComponent } from './components/chat/chat.component';
import { MapComponent } from './components/map/map.component';

import { LocalizeDirective } from "./directives/localize.directive";

import { HomePage } from './pages/home/home.page';
import { MyTripsPage } from './pages/mytrips/mytrips.page';
import { InvitedTripsPage } from './pages/invitedtrips/invitedtrips.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { NewTripPage } from "./pages/newtrip/newtrip.page";
import { TripPage } from "./pages/trip/trip.page";
import { AcceptInvitePage } from "./pages/acceptinvite/acceptinvite.page";

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "./", ".json");
}

export class CustomToastOption extends ToastOptions {
    maxShown = 1;
    toastLife = 3000;
    showCloseButton = true;
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        ChatComponent,
        MapComponent,
        HomePage,
        MyTripsPage,
        InvitedTripsPage,
        LoginPage,
        RegisterPage,
        NewTripPage,
        TripPage,
        AcceptInvitePage,
        LocalizeDirective
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
            { path: 'newtrip', component: NewTripPage, canActivate: [AuthGuard] },
            { path: 'edittrip/:id', component: NewTripPage, canActivate: [AuthGuard] },
            { path: 'trip/:id', component: TripPage, canActivate: [AuthGuard] },
            { path: 'acceptinvite/:inviteId', component: AcceptInvitePage, canActivate: [AuthGuard] },
            { path: '**', redirectTo: 'home' }
        ]),
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDJmD8azOwGxMPw-bZIcBSQANhRZgBTaAc", // todo extract to settings
            libraries: ["places"]
        }),
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        AuthGuard,
        AuthService,
        BackendService,
        ChatService,
        WebSocketService,
        NotificationObsService,
        MapObsService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        { provide: ToastOptions, useClass: CustomToastOption }
    ]
})
export class AppModule {
}