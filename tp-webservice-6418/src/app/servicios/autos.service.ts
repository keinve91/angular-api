// src/app/autos/autos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../componentes/llave-api';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private apiUrl = 'https://cars-database-with-image.p.rapidapi.com/api/search';

  private headers = new HttpHeaders({
    'x-rapidapi-host': 'cars-database-with-image.p.rapidapi.com',
    'x-rapidapi-key': environment.rapidApiKey
  });

  constructor(private http: HttpClient) {}

  buscarAutos(query: string, page: number): Observable<any> {
    const params = new HttpParams().set('q', query).set('page', page.toString());

    return this.http.get(this.apiUrl, {
      headers: this.headers,
      params: params
    });
  }
}
