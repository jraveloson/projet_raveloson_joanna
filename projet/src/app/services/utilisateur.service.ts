import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = 'https://templateweb-latest-00ck.onrender.com';
  // private apiUrl = 'http://localhost:443';
  private utilisateurs$ = new BehaviorSubject<Utilisateur[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Utilisateur[]>(`${this.apiUrl}/api/utilisateur`).subscribe(data => {
      this.utilisateurs$.next(data);
    });
  }

  public getUtilisateurs(): Observable<Utilisateur[]> {
    // return this.utilisateurs$.asObservable();
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/api/utilisateur`);
  }

  public addUtilisateur(utilisateur: Utilisateur): Observable<any> {
    // return this.http.post<Utilisateur>(`${this.apiUrl}/api/utilisateurs`, utilisateur).pipe(
    //   tap(created => {
    //     const current = this.utilisateurs$.getValue();
    //     this.utilisateurs$.next([...current, created]);
    //   })
    // );
    return this.http.post(`${this.apiUrl}/api/utilisateur`, utilisateur);
  }

}
