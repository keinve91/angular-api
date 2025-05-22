import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneradorService } from '../../servicios/generador.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GoogleGenerativeAI, Part, GenerativeModel, FinishReason } from '@google/generative-ai';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-imagen-ia',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './generador.component.html',
  styleUrl: './generador.component.css'
})
export class GeneradorComponent {
  textoUsuario = '';
  textoGenerado = '';
  fuenteImagen?: string;
  cargando = false;

  constructor(private servicioGemini: GeneradorService) {}

  async generar() {
    if (!this.textoUsuario) return;

    this.cargando = true;
    this.textoGenerado = '';
    this.fuenteImagen = undefined;

    try {
      const resultado = await this.servicioGemini.generarImagenConTexto(this.textoUsuario);
      this.textoGenerado = resultado.texto;
      this.fuenteImagen = resultado.urlImagen;
    } catch (error) {
      console.error('Error al generar la imagen:', error);
      this.textoGenerado = 'Ocurrió un error al generar la imagen.';
    } finally {
      this.cargando = false;
    }
  }

}