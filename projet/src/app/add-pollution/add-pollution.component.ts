import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PollutionService } from '../services/pollution.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pollution',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-pollution.component.html',
  styleUrls: ['./add-pollution.component.css']
})
export class AddPollutionComponent {
  pollutionForm: FormGroup;
  maxDate: string;

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
