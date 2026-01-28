import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private favorites$ = new BehaviorSubject<number[]>(this.loadFromStorage());

    constructor() { }

    // Obtenir tous les IDs des favoris
    getFavorites(): Observable<number[]> {
        return this.favorites$.asObservable();
    }

    // Vérifier si un ID est en favori
    isFavorite(pollutionId: number): boolean {
        return this.favorites$.value.includes(pollutionId);
    }

    // Ajouter un favori
    addFavorite(pollutionId: number): void {
        const current = this.favorites$.value;
        if (!current.includes(pollutionId)) {
            const updated = [...current, pollutionId];
            this.favorites$.next(updated);
            this.saveToStorage(updated);
        }
    }

    // Retirer un favori
    removeFavorite(pollutionId: number): void {
        const current = this.favorites$.value;
        const updated = current.filter(id => id !== pollutionId);
        this.favorites$.next(updated);
        this.saveToStorage(updated);
    }

    // Basculer (ajouter ou retirer)
    toggleFavorite(pollutionId: number): void {
        if (this.isFavorite(pollutionId)) {
            this.removeFavorite(pollutionId);
        } else {
            this.addFavorite(pollutionId);
        }
    }

    // Obtenir le nombre de favoris
    getFavoritesCount(): Observable<number> {
        return this.favorites$.asObservable().pipe(
            map(favorites => favorites.length)
        );
    }

    // Charger depuis localStorage
    private loadFromStorage(): number[] {
        try {
            const stored = localStorage.getItem('favorites');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    // Sauvegarder dans localStorage
    private saveToStorage(favorites: number[]): void {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
