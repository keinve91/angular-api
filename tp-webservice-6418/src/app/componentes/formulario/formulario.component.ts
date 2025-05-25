import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelefonoService } from '../../servicios/telefono.service';
import { CorreoElectronicoService } from '../../servicios/correo-electronico.service';
import { Observable, of, lastValueFrom } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'] 
})
export class FormularioComponent {
  nombreIngresado: string = '';
  mensajeNombre: string = '';
  nombreValido: boolean | null = null;

  apellidoIngresado: string = '';
  mensajeApellido: string = '';
  apellidoValido: boolean | null = null;

  dniIngresado: string = '';
  mensajeDni: string = '';
  dniValido: boolean | null = null;

  numeroIngresado: string = '';
  mensajeTelefono: string = '';
  telefonoValido: boolean | null = null;
  isLoadingTelefono: boolean = false;

  correoIngresado: string = '';
  mensajeCorreo: string = '';
  correoValido: boolean | null = null;
  isLoadingCorreo: boolean = false;

  mensajeFormulario: string = '';
  formularioAceptado: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private telefonoService: TelefonoService,
    private correoService: CorreoElectronicoService
  ) {}

  validarNombre(): boolean {
    this.mensajeNombre = '';
    if (!this.nombreIngresado.trim()) {
      this.mensajeNombre = '⚠️ El nombre es obligatorio.';
      this.nombreValido = false;
      return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombreIngresado)) {
      this.mensajeNombre = '⚠️ El nombre solo puede contener letras y espacios.';
      this.nombreValido = false;
      return false;
    }
    this.nombreValido = true;
    return true;
  }

  validarApellido(): boolean {
    this.mensajeApellido = '';
    if (!this.apellidoIngresado.trim()) {
      this.mensajeApellido = '⚠️ El apellido es obligatorio.';
      this.apellidoValido = false;
      return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.apellidoIngresado)) {
      this.mensajeApellido = '⚠️ El apellido solo puede contener letras y espacios.';
      this.apellidoValido = false;
      return false;
    }
    this.apellidoValido = true;
    return true;
  }

  validarDni(): boolean {
    this.mensajeDni = '';
    if (!this.dniIngresado.trim()) {
      this.mensajeDni = '⚠️ El DNI es obligatorio.';
      this.dniValido = false;
      return false;
    }
    if (!/^\d{7,8}$/.test(this.dniIngresado)) {
      this.mensajeDni = '⚠️ El DNI debe tener 7 u 8 dígitos numéricos.';
      this.dniValido = false;
      return false;
    }
    this.dniValido = true;
    return true;
  }

  async verificarTelefonoIndividual(): Promise<void> {
    this.telefonoValido = null; 
    this.mensajeTelefono = '';
    this.isLoadingTelefono = true;
    try {
      await lastValueFrom(this._verificarTelefonoObservable());
    } catch (error) {
      console.error("Error caught by verificarTelefonoIndividual", error);
    } finally {
      this.isLoadingTelefono = false;
    }
  }

  async verificarCorreoIndividual(): Promise<void> {
    this.correoValido = null; 
    this.mensajeCorreo = '';
    this.isLoadingCorreo = true;
    try {
      await lastValueFrom(this._verificarCorreoObservable());
    } catch (error) {
      console.error("Error caught by verificarCorreoIndividual", error);
    } finally {
      this.isLoadingCorreo = false;
    }
  }

  private _verificarTelefonoObservable(): Observable<boolean> {
    this.mensajeTelefono = ''; 
    this.telefonoValido = null;

    if (!this.numeroIngresado.match(/^\d{10}$/)) {
      this.mensajeTelefono = '⚠️ Ingresa un número de 10 dígitos (ej: 1134567890, sin +54, 0 o 15).';
      this.telefonoValido = false;
      return of(false);
    }
    this.isLoadingTelefono = true;
    return this.telefonoService.verificarNumero(this.numeroIngresado).pipe(
      tap(data => {
        if (data.valid) {
          this.telefonoValido = true;
          this.mensajeTelefono = '✅ El número es válido.';
        } else {
          this.telefonoValido = false;
          this.mensajeTelefono = `❌ Número inválido o no verificado. ${data.message || 'Intenta con otro.'}`;
        }
      }),
      map(data => data.valid),
      catchError(() => {
        this.telefonoValido = false;
        this.mensajeTelefono = '❌ Error al conectar con el servicio de verificación de teléfono.';
        return of(false); 
      }),
      tap(() => this.isLoadingTelefono = false) 
    );
  }

  private _verificarCorreoObservable(): Observable<boolean> {
    this.mensajeCorreo = ''; 
    this.correoValido = null;

    if (!this.correoIngresado.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.mensajeCorreo = '⚠️ Ingresa un formato de correo electrónico válido.';
      this.correoValido = false;
      return of(false);
    }
    this.isLoadingCorreo = true;
    return this.correoService.verificarCorreo(this.correoIngresado).pipe(
      tap(data => {
        const esValidoSegunApi = data.syntax_valid && data.mx_records && data.is_deliverable; 
        if (esValidoSegunApi) {
          this.correoValido = true;
          this.mensajeCorreo = '✅ El correo es válido y verificable.';
        } else {
          this.correoValido = false;
          let errorDetail = "No se pudo verificar completamente.";
          if (!data.syntax_valid) errorDetail = "Sintaxis incorrecta.";
          else if (!data.mx_records) errorDetail = "No se encontraron registros MX.";
          else if (!data.is_deliverable) errorDetail = "El correo podría no ser entregable.";
          this.mensajeCorreo = `❌ El correo no es válido. ${errorDetail}`;
        }
      }),
      map(data => data.syntax_valid && data.mx_records && data.is_deliverable),
      catchError(() => {
        this.correoValido = false;
        this.mensajeCorreo = '❌ Error al conectar con el servicio de verificación de correo.';
        return of(false); 
      }),
      tap(() => this.isLoadingCorreo = false) 
    );
  }

  async enviarFormulario(): Promise<void> {
    this.formularioAceptado = false;
    this.mensajeFormulario = '';
    this.isSubmitting = true;

    const esNombreValido = this.validarNombre();
    const esApellidoValido = this.validarApellido();
    const esDniValido = this.validarDni();

    if (!esNombreValido) this.validarNombre();
    if (!esApellidoValido) this.validarApellido();
    if (!esDniValido) this.validarDni();


    if (!esNombreValido || !esApellidoValido || !esDniValido) {
      this.mensajeFormulario = '❌ Por favor, corrige los errores en los campos básicos.';
      this.isSubmitting = false;
      return;
    }
    
    const telefonoPromise = (this.telefonoValido === true && this.numeroIngresado.trim() !== '')
        ? Promise.resolve(true)
        : this.numeroIngresado.trim() === '' // Si está vacío, no es válido para el submit final
            ? (this.mensajeTelefono = '⚠️ El teléfono es obligatorio para enviar.', this.telefonoValido = false, Promise.resolve(false))
            : lastValueFrom(this._verificarTelefonoObservable());

    const correoPromise = (this.correoValido === true && this.correoIngresado.trim() !== '')
        ? Promise.resolve(true)
        : this.correoIngresado.trim() === ''
            ? (this.mensajeCorreo = '⚠️ El correo es obligatorio para enviar.', this.correoValido = false, Promise.resolve(false))
            : lastValueFrom(this._verificarCorreoObservable());
    
    try {
      const [telefonoEsValidoAPI, correoEsValidoAPI] = await Promise.all([
        telefonoPromise,
        correoPromise
      ]);

      if (esNombreValido && esApellidoValido && esDniValido && telefonoEsValidoAPI && correoEsValidoAPI) {
        this.formularioAceptado = true;
        this.mensajeFormulario = '✅ ¡Formulario aceptado y enviado exitosamente!';
        console.log('Datos del formulario:', {
          nombre: this.nombreIngresado,
          apellido: this.apellidoIngresado,
          dni: this.dniIngresado,
          telefono: this.numeroIngresado,
          correo: this.correoIngresado,
        });
      } else {
        this.mensajeFormulario = '❌ Por favor, verifica todos los campos marcados con error.';
        if (!telefonoEsValidoAPI && !this.mensajeTelefono && this.numeroIngresado) this.mensajeTelefono = "❌ El teléfono requiere verificación o es inválido.";
        if (!correoEsValidoAPI && !this.mensajeCorreo && this.correoIngresado) this.mensajeCorreo = "❌ El correo requiere verificación o es inválido.";
      }
    } catch (error) {
      console.error('Error durante la sumisión del formulario (API calls):', error);
      this.mensajeFormulario = '❌ Ocurrió un error al procesar las validaciones del formulario. Intenta de nuevo.';
        if (this.telefonoValido !== true && !this.mensajeTelefono && this.numeroIngresado) {
            this.mensajeTelefono = '❌ Error en la verificación del teléfono.';
        }
        if (this.correoValido !== true && !this.mensajeCorreo && this.correoIngresado) {
            this.mensajeCorreo = '❌ Error en la verificación del correo.';
        }
    } finally {
      this.isSubmitting = false;
    }
  }

  resetFormFields(): void {
    this.nombreIngresado = '';
    this.mensajeNombre = '';
    this.nombreValido = null;
    this.apellidoIngresado = '';
    this.mensajeApellido = '';
    this.apellidoValido = null;
    this.dniIngresado = '';
    this.mensajeDni = '';
    this.dniValido = null;
    this.numeroIngresado = '';
    this.mensajeTelefono = '';
    this.telefonoValido = null;
    this.correoIngresado = '';
    this.mensajeCorreo = '';
    this.correoValido = null;
    this.mensajeFormulario = '';
    this.formularioAceptado = false;
  }
}