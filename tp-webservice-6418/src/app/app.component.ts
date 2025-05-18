import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 Importa RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // 👈 Cambia esto
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-webservice-6418';
}
