import { Routes } from '@angular/router';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { AutosComponent } from './componentes/autos/autos.component';
import { ConversorComponent } from './componentes/conversor/conversor.component';
import { GeneradorComponent } from './componentes/generador/generador.component';
export const routes: Routes = [

    {path: 'noticias', component: NoticiasComponent},
    {path: 'autos', component: AutosComponent},
    {path: 'monedas', component: ConversorComponent},
    {path: 'generador', component: GeneradorComponent},
    { path: '', redirectTo: '/noticias', pathMatch: 'full' },
    { path: '**', redirectTo: '/noticias' }

];
