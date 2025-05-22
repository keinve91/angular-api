import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../componentes/llave-api';
@Injectable({
  providedIn: 'root'
})
export class TelefonoService {

  private baseUrl = 'https://api.apilayer.com/number_verification/validate';
  private headers = new HttpHeaders({
    'apikey': environment.apiLayerKey
  });

  constructor(private http: HttpClient) {}

  verificarNumero(numeroSinPrefijo: string): Observable<any> {
    const numeroCompleto = `+54${numeroSinPrefijo}`;
    const url = `${this.baseUrl}?number=${numeroCompleto}`;
    return this.http.get(url, { headers: this.headers });
  }
}
 