import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PollutionService } from '../services/pollution.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pollution',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-pollution.component.html',
  styleUrls: ['./add-pollution.component.css']
})
export class AddPollutionComponent {
  pollutionForm: FormGroup;
  maxDate: string;
  imagePreview: string | null = null;
  imageSizeError: string | null = null;
  readonly MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB en bytes
  readonly MAX_FILE_SIZE_MB = 2;

  constructor(private fb: FormBuilder, private pollutionService: PollutionService, private router: Router) {
    // Définir la date maximale (aujourd'hui) au format YYYY-MM-DD
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.pollutionForm = this.fb.group({
      titre: ['', Validators.required],
      type_pollution: ['', Validators.required],
      description: ['', Validators.required],
      date_observation: ['', [Validators.required, this.maxDateValidator.bind(this)]],
      lieu: ['', Validators.required],
      latitude: [
        null,
        [Validators.required, Validators.min(-90), Validators.max(90)]
      ],
      longitude: [
        null,
        [Validators.required, Validators.min(-180), Validators.max(180)]
      ],
      photo_url: ['']
    });
  }

  maxDateValidator(control: any) {
    if (!control.value) {
      return null;
    }
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      return { maxDate: true };
    }
    return null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.imageSizeError = null;
    this.imagePreview = null;

    if (!file) {
      this.pollutionForm.get('photo_url')?.reset();
      return;
    }

    // Vérifier la taille du fichier
    if (file.size > this.MAX_FILE_SIZE) {
      this.imageSizeError = `Le fichier est trop volumineux (${(file.size / 1024 / 1024).toFixed(2)}MB). Taille maximale: ${this.MAX_FILE_SIZE_MB}MB`;
      this.pollutionForm.get('photo_url')?.reset();
      return;
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      this.imageSizeError = 'Veuillez sélectionner un fichier image valide';
      this.pollutionForm.get('photo_url')?.reset();
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64String = e.target.result;
      this.pollutionForm.get('photo_url')?.setValue(base64String);
      this.imagePreview = base64String;
      this.imageSizeError = null;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.pollutionForm.valid) {
      this.pollutionService.addPollution(this.pollutionForm.value).subscribe({
        next: () => {
          this.router.navigate(['/pollutions']);
        },
        error: (err) => {
          alert('Erreur lors de la création de la pollution: ' + err.message);
        }
      });
    }
  }
}
