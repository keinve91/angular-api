import { Routes } from '@angular/router';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { AutosComponent } from './componentes/autos/autos.component';
import { ConversorComponent } from './componentes/conversor/conversor.component';
import { GeneradorComponent } from './componentes/generador/generador.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
export const routes: Routes = [

    {path: 'noticias', component: NoticiasComponent},
    {path: 'autos', component: AutosComponent},
    {path: 'monedas', component: ConversorComponent},
    {path: 'generador', component: GeneradorComponent},
    {path:'eleccion',component:FormularioComponent},
    { path: '', redirectTo: '/noticias', pathMatch: 'full' },
    { path: '**', redirectTo: '/noticias' }

];
