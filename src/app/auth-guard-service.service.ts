import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertService } from './alert/alert.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardServiceService implements CanActivate {
  constructor(
    private userService: UsersService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(): boolean {
    if (localStorage.getItem('userLogged')) {
      return true;
    } else {
      this.router.navigate(['Login']);
      window.scrollTo(0, 0);
      this.alertService.setShowAlert('Devi effettuare il Login', 'purple');
      return false;
    }
  }
}
