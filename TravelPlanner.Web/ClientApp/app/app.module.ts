import { NgModule, Inject, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { BackendService } from "./services/backend.service";
import { ChatService } from "./services/chat.service";
import { WebSocketService } from "./services/websocket.service";
import { InterceptedHttp } from "./utils/http.interceptor";
import { GlobalErrorHandler } from "./services/global-error-handler.service";
import { NotificationService } from "./services/notification.service";

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ChatComponent } from './components/chat/chat.component';
import { NotificationComponent } from './components/notification/notification.component';

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

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        ChatComponent,
        NotificationComponent,
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
        })
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        AuthGuard,
        AuthService,
        BackendService,
        ChatService,
        WebSocketService,
        NotificationService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})
export class AppModule {
}