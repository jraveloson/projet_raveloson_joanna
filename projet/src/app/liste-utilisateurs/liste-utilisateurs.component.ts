import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-utilisateurs',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liste-utilisateurs.component.html',
  styleUrl: './liste-utilisateurs.component.css'
})
export class ListeUtilisateursComponent {
  utilisateurs$!: Observable<Utilisateur[]>;
  selectedType: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit(): void {
    this.utilisateurs$ = this.utilisateurService.getUtilisateurs();
  }

  public addUtilisateur(utilisateur: Utilisateur): void {
    this.utilisateurService.addUtilisateur(utilisateur);
  }
}
