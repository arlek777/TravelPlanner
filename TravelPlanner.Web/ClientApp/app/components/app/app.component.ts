import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationObsService } from "../../services/observables/notification.service";
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', '../../css/forms.css']
})
export class AppComponent implements OnInit {
    constructor(private translate: TranslateService,
        private notificationService: NotificationObsService,
        private toastr: ToastsManager,
        private viewRef: ViewContainerRef) {

        this.translate.use('ru');
        this.toastr.setRootViewContainerRef(viewRef);
    }

    ngOnInit() {
        this.notificationService.validationErrors.subscribe((error: string) => {
            setTimeout(() => {
                var translation = this.translate.instant(error);
                this.toastr.error(translation);
            });
        });
    }
}
