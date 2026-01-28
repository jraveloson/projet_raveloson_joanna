import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PollutionService } from '../services/pollution.service';
import { switchMap } from 'rxjs';
import { Pollution } from '../models/pollution.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-pollution',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './edit-pollution.component.html',
  styleUrls: ['./edit-pollution.component.css']
})
export class EditPollutionComponent {
  pollutionForm: FormGroup;
  imagePreview: string | null = null;
  imageSizeError: string | null = null;
  id!: number;
  readonly MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB en bytes
  readonly MAX_FILE_SIZE_MB = 2;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pollutionService: PollutionService) {
    this.pollutionForm = this.fb.group({
      titre: ['', Validators.required],
      type_pollution: ['', Validators.required],
      description: ['', Validators.required],
      date_observation: ['', Validators.required],
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

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || isNaN(Number(idParam))) {
      console.error("ID invalide dans l'URL");
      this.router.navigate(['/']);
      return;
    }
    this.id = Number(idParam);

    this.pollutionService.getOne(this.id).subscribe(pollution => {
      this.pollutionForm.patchValue(pollution!);
      // Afficher l'image existante si elle est en base64 ou une URL
      if (pollution?.photo_url) {
        this.imagePreview = pollution.photo_url;
      }
    });
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

  onSubmit(): void {
    this.pollutionService.updatePollution(this.id, this.pollutionForm.value)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
  }
}
