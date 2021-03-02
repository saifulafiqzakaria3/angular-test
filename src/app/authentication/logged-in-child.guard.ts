import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInChildGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
        take(1),
        map((user) => {
          const isLoggedIn = !user ? false : true;
          if (isLoggedIn) {
            return true;
          }
          return this.router.createUrlTree(['/Unauthorized']);
        })
      );
  }

}
