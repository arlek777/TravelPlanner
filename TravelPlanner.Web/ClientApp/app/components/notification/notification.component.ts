import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
    errors:string[] = [];
    infos: string[] = [];

    constructor(private notificationService: NotificationService) {
        this.notificationService.validationErrors.subscribe((msg: string) => {
            this.errors.push(msg);
        });
        this.notificationService.serverErrors.subscribe((msg: string) => {
            this.errors.push(msg);
        });
    }
}
