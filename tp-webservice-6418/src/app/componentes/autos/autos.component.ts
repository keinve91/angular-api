import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // para ngModel
import { ActivatedRoute, Router } from '@angular/router';
import { AutosService } from '../../servicios/autos.service';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {
  autos: any[] = [];
  busqueda = '';
  route = inject(ActivatedRoute);
  router = inject(Router);
  autosService = inject(AutosService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || 'toyota';
      this.busqueda = query; // mostrar en input
      const page = parseInt(params['page'] || '1');
      this.autosService.buscarAutos(query, page).subscribe(data => {
        this.autos = data.results.slice(0, 5);
      });
    });
  }

  buscarAuto() {
    this.router.navigate(['/autos'], {
      queryParams: { q: this.busqueda, page: 1 }
    });
  }
}
