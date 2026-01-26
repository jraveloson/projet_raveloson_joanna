import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginCredentials } from '../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value as LoginCredentials;
      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/pollutions']);
        },
        error: (err) => {
          const msg = err?.status === 0
            ? 'Serveur injoignable: backend non démarré ou port/CORS.'
            : (err?.error?.message || 'Login ou mot de passe incorrect');
          alert(msg);
          console.error('Erreur login:', err);
        }
      });
    }
  }

}
