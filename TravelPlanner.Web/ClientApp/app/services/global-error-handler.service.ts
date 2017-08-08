import { Response } from '@angular/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from "./notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error) {
        var response = <Response>error.rejection;
        if (response) {
            var notificationService = this.injector.get(NotificationService);

            // bad request
            if (response.status === 400) {
                notificationService.validationErrors.next(response.text());
            } else {
                notificationService.serverErrors.next(response.text());
                console.log(response.text());
            }
        } else {
            console.log(error);
            throw error;
        }
    }
}