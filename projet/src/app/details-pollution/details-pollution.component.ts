import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { PollutionService } from '../services/pollution.service';
import { map, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollution.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-details-pollution',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './details-pollution.component.html',
  styleUrls: ['./details-pollution.component.css']
})
export class DetailsPollutionComponent implements OnInit {
  pollution$!: Observable<Pollution>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollutionService: PollutionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const pollutionId = params['id'];
      this.pollution$ = this.pollutionService.getOne(pollutionId);
    });
  }

}
