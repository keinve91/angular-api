import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private url = 'https://livescore6.p.rapidapi.com/news/v2/list';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '6b3b29a387msh8fdeb3762e3597fp18917ajsn7a3576dc8a81',
    'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
  });

  private categoriasFiltradas = ['Football', 'Match reports', 'Predictions'];
  private datosPorCategoria: { [key: string]: any[] } = {};

  constructor(private http: HttpClient) {}

obtenerCategorias(): Observable<string[]> {
  if (Object.keys(this.datosPorCategoria).length > 0) {
    return of(this.categoriasFiltradas);
  } else {
    return this.http.get<any>(this.url, { headers: this.headers }).pipe(
      tap(response => {
        const homepageArticles = response.homepageArticles || [];

        this.datosPorCategoria = {
          'Football': [],
          'Match reports': [],
          'Predictions':[]
        };

        for (const bloque of homepageArticles) {
          const articulos = bloque.articles || [];

          for (const art of articulos) {
            const categoriaLabel = art.categoryLabel;

            if (
              this.categoriasFiltradas.includes(categoriaLabel) &&
              art.title &&
              art.mainMedia?.[0]?.original?.url
            ) {
              this.datosPorCategoria[categoriaLabel].push(art);
            }
          }
        }
      }),
      map(() => this.categoriasFiltradas)
    );
  }
}


  obtenerNoticiasPorCategoria(categoria: string): Observable<any[]> {
    return of(this.datosPorCategoria[categoria] || []);
  }
}
