import { Component } from '@angular/core';
import { RegistrationViewModel } from "../../models/auth/registration";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.page.html'
})
export class RegisterPage {
    constructor(private authService: AuthService, private router: Router) {
    }

    model = new RegistrationViewModel();

    onSubmit() {
        this.authService.register(this.model).then(() => {
            if (this.authService.redirectUrl) { this.router.navigate([this.authService.redirectUrl]); }
            else { this.router.navigate(['/home']); }
        });
    }
}
