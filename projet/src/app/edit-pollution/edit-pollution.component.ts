import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PollutionService } from '../services/pollution.service';
import { switchMap } from 'rxjs';
import { Pollution } from '../models/pollution.model';

@Component({
  selector: 'app-edit-pollution',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-pollution.component.html',
  styleUrls: ['./edit-pollution.component.css']
})
export class EditPollutionComponent {
  pollutionForm: FormGroup;

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

  id!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || isNaN(Number(idParam))) {
      console.error('ID invalide dans l’URL');
      this.router.navigate(['/']);
      return;
    }
    this.id = Number(idParam);

    this.pollutionService.getOne(this.id).subscribe(pollution => {
      this.pollutionForm.patchValue(pollution!);
    });
  }

  onSubmit(): void {
    this.pollutionService.updatePollution(this.id, this.pollutionForm.value)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
  }
}
