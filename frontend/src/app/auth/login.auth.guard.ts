import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginAuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            this.router.navigateByUrl('/dashboard');
        } else {
            this.router.navigateByUrl('/login');
        }
        return token ? true : false;
    }
}