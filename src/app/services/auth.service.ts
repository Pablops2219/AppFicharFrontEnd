import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ jwt: string }>(`${this.apiUrl}/auth/log-in`, credentials)
      .pipe(tap(response => {
        localStorage.setItem('jwt', response.jwt);
      }));
  }

  
  register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    rolesRequest: { roleListName: string[] };
  }) {
    return this.http.post(`${this.apiUrl}/auth/sign-up`, userData);
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserData(): any {
    const token = localStorage.getItem('jwt'); // O donde guardes tu token
    if (!token) {
      return null;
    }
  
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
  
    const authoritiesList = payload.authorities.split(',');
  
    // Separa roles y permisos
    const roles = authoritiesList.filter((auth: string) => auth.startsWith('ROLE_'));
    const permissions = authoritiesList.filter((auth: string) => !auth.startsWith('ROLE_'));
    
    // console.log('Roles:', roles);
    // console.log('Permissions:', permissions);

    return {
      email: payload.sub,
      roles: roles,
      permissions: permissions,
      issuedAt: new Date(payload.iat * 1000),
      expiresAt: new Date(payload.exp * 1000),
   
      jwtId: payload.jti,
    };
  }

  isAdmin(): boolean {
    const userData = this.getUserData();
    return userData && userData.roles.includes('ROLE_ADMIN');
  }

  isUser(): boolean {
    const userData = this.getUserData();
    return userData && userData.roles.includes('ROLE_USER');
  }

  isManager(): boolean {
    const userData = this.getUserData();
    return userData && userData.roles.includes('ROLE_SUPER_ADMIN');
  }
  
  getUserPowerLevel(): number {
    const roles = this.getUserData().roles;
  
    if (roles.includes('ROLE_DEVELOPER')) return 4;
    if (roles.includes('ROLE_ADMIN')) return 3;
    if (roles.includes('ROLE_MANAGER')) return 2;
    if (roles.includes('ROLE_USER')) return 1;
  
    return 0; 
  }
  
}
