import { UserService } from '../../services/user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private userService: UserService
    ){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.userService.isUserLoggedIn()){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
