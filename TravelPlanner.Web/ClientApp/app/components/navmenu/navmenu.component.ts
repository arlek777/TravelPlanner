import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    constructor(private authService: AuthService, private router: Router) {
    }

    isLogoutVisible() {
        return this.authService.isLoggedIn();
    }

    logout = () => {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}
