import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollution.model';
import { PollutionService } from '../services/pollution.service';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-favorites-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './favorites-list.component.html',
    styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {
    favoritePollutions$!: Observable<Pollution[]>;

    constructor(
        private pollutionService: PollutionService,
        private favoritesService: FavoritesService
    ) { }

    ngOnInit(): void {
        // Obtenir toutes les pollutions, puis filtrer par favoris
        this.favoritePollutions$ = this.favoritesService.getFavorites().pipe(
            switchMap(favoriteIds => {
                return this.pollutionService.getPollutions().pipe(
                    map(pollutions =>
                        pollutions.filter(p => p.id && favoriteIds.includes(p.id))
                    )
                );
            })
        );
    }

    removeFavorite(pollutionId: number): void {
        this.favoritesService.removeFavorite(pollutionId);
    }
}
