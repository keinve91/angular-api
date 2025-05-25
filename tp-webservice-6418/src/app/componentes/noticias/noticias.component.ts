import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../servicios/noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit {
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  noticias: any[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.obtenerCategorias().subscribe({
      next: (cats) => {
        this.categorias = cats;
        if (this.categorias.length > 0) {
          this.categoriaSeleccionada = this.categorias[0];
          this.cargarNoticias();
        }
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  cargarNoticias(): void {
    if (this.categoriaSeleccionada) {
      this.noticiasService.obtenerNoticiasPorCategoria(this.categoriaSeleccionada).subscribe({
        next: (notis) => (this.noticias = notis),
        error: (err) => console.error('Error al cargar noticias:', err)
      });
    } else {
      this.noticias = [];
    }
  }
}
