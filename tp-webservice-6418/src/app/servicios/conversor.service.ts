import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../componentes/llave-api';
@Injectable({
  providedIn: 'root'
})
export class ConversorService {
  private apiKey = environment.apiLayerKey;
  private baseUrl = 'https://api.apilayer.com/currency_data';

  constructor(private http: HttpClient) {}

  getMonedas(): Observable<any> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    return this.http.get(`${this.baseUrl}/list`, { headers });
  }

  convertir(from: string, to: string, amount: number): Observable<any> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('amount', amount);

    return this.http.get(`${this.baseUrl}/convert`, { headers, params });
  }
}
