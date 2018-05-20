import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: LoginService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('OnlyLoggedInUsers');
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      window.alert('You don\'t have permission to view this page');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
