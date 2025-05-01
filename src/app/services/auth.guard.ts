import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service'; // Ajusta el path si lo tienes en otro lado
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();

    if (!token) {
      console.log('No token found, redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
    
    const minPowerLevel = route.data['minPowerLevel'] ?? 0;

    if (this.authService.getUserPowerLevel() >= minPowerLevel) {
      console.log('User has sufficient power level, granting access...');
      return true;
    } else {
      console.log('User does not have sufficient power level, redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
