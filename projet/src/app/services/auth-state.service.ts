import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState, UtilisateurInfo } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private readonly initialState: AuthState = {
        token: null,
        utilisateur: null
    };

    private state$ = new BehaviorSubject<AuthState>(this.initialState);

    constructor() {
        // Restaurer l'état depuis localStorage au démarrage si nécessaire
        this.loadFromStorage();
    }

    // Sélecteurs
    getState(): Observable<AuthState> {
        return this.state$.asObservable();
    }

    getToken(): string | null {
        return this.state$.value.token;
    }

    getUtilisateur(): UtilisateurInfo | null {
        return this.state$.value.utilisateur;
    }

    isAuthenticated(): boolean {
        return !!this.state$.value.token;
    }

    // Actions
    setAuth(token: string, utilisateur: UtilisateurInfo): void {
        const newState: AuthState = { token, utilisateur };
        this.state$.next(newState);
        this.saveToStorage(newState);
    }

    clearAuth(): void {
        this.state$.next(this.initialState);
        this.clearStorage();
    }

    // Persistence (temporaire pour compatibilité, peut être retiré si store pur souhaité)
    private saveToStorage(state: AuthState): void {
        if (state.token) {
            localStorage.setItem('token', state.token);
        }
        if (state.utilisateur) {
            localStorage.setItem('utilisateur', JSON.stringify(state.utilisateur));
        }
    }

    private loadFromStorage(): void {
        const token = localStorage.getItem('token');
        const utilisateurStr = localStorage.getItem('utilisateur');

        if (token && utilisateurStr) {
            try {
                const utilisateur: UtilisateurInfo = JSON.parse(utilisateurStr);
                this.state$.next({ token, utilisateur });
            } catch (e) {
                this.clearStorage();
            }
        }
    }

    private clearStorage(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('utilisateur');
    }
}
