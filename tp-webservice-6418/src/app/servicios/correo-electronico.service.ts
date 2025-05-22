import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../componentes/llave-api';
@Injectable({
  providedIn: 'root'
})
export class CorreoElectronicoService {
    private baseUrl='https://api.apilayer.com/email_verification';
    private headers = new HttpHeaders({
    'apikey':environment.apiLayerKey 
    });

  constructor(private http:HttpClient) { }
  verificarCorreo(correo: string): Observable<any> {
    const url = `${this.baseUrl}/${encodeURIComponent(correo)}`;
    return this.http.get(url, { headers: this.headers });
  }
}