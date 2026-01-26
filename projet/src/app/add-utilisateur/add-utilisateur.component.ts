import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-add-utilisateur',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent {
  utilisateurForm: FormGroup;

  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurService, private router: Router) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.utilisateurForm.valid) {
      this.utilisateurService.addUtilisateur(this.utilisateurForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur backend complète :', err);
          alert("Erreur lors de l'inscription (voir console)");
        }

      });
    }
  }

}
