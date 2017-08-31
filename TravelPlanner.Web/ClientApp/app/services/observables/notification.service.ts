import { Subject } from "rxjs/Subject";
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    public validationErrors = new Subject<string>();
    public serverErrors = new Subject<string>();
}
