import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  // private apiUrl = 'https://templateweb-latest-00ck.onrender.com';
  private apiUrl = 'http://localhost:443';
  private pollutions$ = new BehaviorSubject<Pollution[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Pollution[]>(`${this.apiUrl}/api/pollution`).subscribe(data => {
      this.pollutions$.next(data);
    });
  }

  public getPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(`${this.apiUrl}/api/pollution`).pipe(
      tap(data => {
        this.pollutions$.next(data);
      })
    );
  }

  public searchPollutions(query: string): Observable<Pollution[]> {
    if (!query.trim()) {
      return this.getPollutions();
    }
    return this.getPollutions().pipe(
      map(pollutions =>
        pollutions.filter(p =>
          p.titre.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.lieu.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  public getOne(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${this.apiUrl}/api/pollution/${id}`);
  }

  public addPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(`${this.apiUrl}/api/pollution`, pollution).pipe(
      tap(created => {
        const current = this.pollutions$.getValue();
        this.pollutions$.next([...current, created]);
      })
    );
  }

  public updatePollution(id: number, updated: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(
      `${this.apiUrl}/api/pollution/${id}`,
      updated
    );
  }

  public deletePollution(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/pollution/${id}`).pipe(
      tap(() => {
        const current = this.pollutions$.getValue();
        this.pollutions$.next(current.filter(p => p.id !== id));
      })
    );
  }


}
