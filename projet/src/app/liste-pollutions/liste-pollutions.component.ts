import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PollutionService } from '../services/pollution.service';
import { FavoritesService } from '../services/favorites.service';
import { Pollution } from '../models/pollution.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UtilisateurInfo } from '../models/auth.model';
import { TypePipe } from '../type.pipe';

@Component({
  selector: 'app-liste-pollutions',
  standalone: true,
  templateUrl: './liste-pollutions.component.html',
  styleUrls: ['./liste-pollutions.component.css'],
  imports: [CommonModule, RouterLink, FormsModule, TypePipe]
})
export class ListePollutionsComponent implements OnInit {
  pollutions$!: Observable<Pollution[]>;
  favoritesCount$!: Observable<number>;
  selectedType: string = '';
  utilisateur: UtilisateurInfo | null = null;
  private favoriteIds: number[] = [];

  constructor(
    private pollutionService: PollutionService,
    private favoritesService: FavoritesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.pollutions$ = this.pollutionService.getPollutions();
    this.favoritesCount$ = this.favoritesService.getFavoritesCount();
    this.utilisateur = this.authService.getUtilisateur();

    // Charger les favoris au démarrage
    this.favoritesService.getFavorites().subscribe(ids => {
      this.favoriteIds = ids;
    });
  }

  public addPollution(pollution: Pollution): void {
    this.pollutionService.addPollution(pollution);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.includes(id);
  }

  toggleFavorite(id: number): void {
    this.favoritesService.toggleFavorite(id);
  }

  deletePollution(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette pollution ?')) {
      this.pollutionService.deletePollution(id).subscribe({
        next: () => {
          this.pollutions$ = this.pollutionService.getPollutions();
        },
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

