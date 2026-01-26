import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PollutionService } from '../services/pollution.service';

@Component({
  selector: 'app-add-pollution',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-pollution.component.html',
  styleUrls: ['./add-pollution.component.css']
})
export class AddPollutionComponent {
  pollutionForm: FormGroup;

  constructor(private fb: FormBuilder, private pollutionService: PollutionService, private router: Router) {
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
