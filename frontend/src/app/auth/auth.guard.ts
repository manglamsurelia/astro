import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean  {
        const token = localStorage.getItem('token');
        if(!token){
            this.router.navigateByUrl('/login'); 
        }
        return !!token ? true : false;
    }
}