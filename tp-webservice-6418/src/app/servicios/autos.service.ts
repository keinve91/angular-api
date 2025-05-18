// src/app/autos/autos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private apiUrl = 'https://cars-database-with-image.p.rapidapi.com/api/search';

  private headers = new HttpHeaders({
    'x-rapidapi-host': 'cars-database-with-image.p.rapidapi.com',
    'x-rapidapi-key': '6b3b29a387msh8fdeb3762e3597fp18917ajsn7a3576dc8a81'
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
