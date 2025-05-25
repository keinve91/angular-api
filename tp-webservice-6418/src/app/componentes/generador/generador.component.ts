import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneradorService } from '../../servicios/generador.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-imagen-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generador.component.html',
  styleUrl: './generador.component.css'
})
export class GeneradorComponent {
  textoUsuario = '';
  fuenteImagen?: string;
  cargando = false;


  constructor(private servicioGemini: GeneradorService) {}

  async generar() {
    if (!this.textoUsuario.trim()) return;

    this.cargando = true;
    this.fuenteImagen = undefined;

    try {
      const resultado = await this.servicioGemini.generarImagenConTexto(this.textoUsuario);
      this.fuenteImagen = resultado.urlImagen;

      if (!this.fuenteImagen) {
        console.warn('No se recibió una URL de imagen del servicio.');
      }
    } catch (error) {
      console.error('Error al generar la imagen:', error);
    } finally {
      this.cargando = false;
    }
  }
}