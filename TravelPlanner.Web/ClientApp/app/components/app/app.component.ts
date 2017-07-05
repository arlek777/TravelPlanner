import { Component } from '@angular/core';

import { AuthService } from "../../services/auth.service";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthService, BackendService]
})
export class AppComponent {
}
