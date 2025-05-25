import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversorService } from '../../servicios/conversor.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent implements OnInit{
  monedas: string[] = [];
  monedaOrigen = '';
  monedaDestino = '';
  monto = 1;
  resultado: number | null = null;

  constructor(private conversorService: ConversorService) {}

  ngOnInit(): void {
    this.conversorService.getMonedas().subscribe({
      next: (data) => {
        this.monedas = Object.keys(data.currencies);
      },
      error: (err) => console.error('Error al obtener monedas', err)
    });
  }

  convertir(): void {
    if (this.monedaOrigen && this.monedaDestino && this.monto > 0) {
      this.conversorService.convertir(this.monedaOrigen, this.monedaDestino, this.monto).subscribe({
        next: (data) => {
          this.resultado = data.result;
        },
        error: (err) => console.error('Error al convertir', err)
      });
    }
  }
}
