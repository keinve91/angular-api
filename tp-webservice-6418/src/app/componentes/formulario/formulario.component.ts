import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelefonoService } from '../../servicios/telefono.service';
import { CorreoElectronicoService } from '../../servicios/correo-electronico.service';
@Component({
  selector: 'app-formulario',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  // Teléfono
  numeroIngresado: string = '';
  mensajeTelefono: string = '';
  telefonoValido: boolean | null = null;

  // Correo
  correoIngresado: string = '';
  mensajeCorreo: string = '';
  correoValido: boolean | null = null;

  constructor(
    private telefonoService: TelefonoService,
    private correoService: CorreoElectronicoService
  ) {}

  verificarTelefono(): void {
    this.mensajeTelefono = '';
    this.telefonoValido = null;

    if (!this.numeroIngresado.match(/^\d{10}$/)) {
      this.mensajeTelefono = '⚠️ Ingresa un número de 10 dígitos sin el +54.';
      return;
    }

    this.telefonoService.verificarNumero(this.numeroIngresado).subscribe({
      next: (data) => {
        if (data.valid) {
          this.telefonoValido = true;
          this.mensajeTelefono = '✅ El número es válido.';
        } else {
          this.telefonoValido = false;
          this.mensajeTelefono = '❌ Número inválido. Intenta con otro.';
          this.numeroIngresado = '';
        }
      },
      error: () => {
        this.mensajeTelefono = '❌ Error al verificar el número.';
      }
    });
  }

verificarCorreo(): void {
  this.mensajeCorreo = '';
  this.correoValido = null;

  if (!this.correoIngresado.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    this.mensajeCorreo = '⚠️ Ingresa un correo electrónico válido.';
    return;
  }

  this.correoService.verificarCorreo(this.correoIngresado).subscribe({
    next: (data) => {
      if (
        data.syntax_valid &&
        data.mx_records &&
        data.can_connect_smtp &&
        data.is_deliverable
      ) {
        this.correoValido = true;
        this.mensajeCorreo = '✅ El correo es válido.';
      } else {
        this.correoValido = false;
        this.mensajeCorreo = '❌ El correo no es válido. Intenta con otro.';
        this.correoIngresado = '';
      }
    },
    error: () => {
      this.mensajeCorreo = '❌ Error al verificar el correo.';
    }
  });
}

}