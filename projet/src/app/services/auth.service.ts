import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginCredentials, LoginResponse, UtilisateurInfo } from '../models/auth.model';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = 'https://templateweb-latest-00ck.onrender.com/api/utilisateur';
  private apiUrl = 'http://localhost:443/api/utilisateur';

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) { }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.authStateService.setAuth(response.token, response.utilisateur))
    );
  }

  saveAuth(token: string, utilisateur: UtilisateurInfo): void {
    this.authStateService.setAuth(token, utilisateur);
  }

  logout(): void {
    this.authStateService.clearAuth();
  }

  isConnected(): boolean {
    return this.authStateService.isAuthenticated();
  }

  getUtilisateur(): UtilisateurInfo | null {
    return this.authStateService.getUtilisateur();
  }
}
