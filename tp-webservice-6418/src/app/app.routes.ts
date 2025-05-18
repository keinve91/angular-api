import { Routes } from '@angular/router';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { AutosComponent } from './componentes/autos/autos.component';
export const routes: Routes = [

    {path: 'noticias', component: NoticiasComponent},
    {path: 'autos', component: AutosComponent},

    { path: '', redirectTo: '/noticias', pathMatch: 'full' },
    { path: '**', redirectTo: '/noticias' }

];
