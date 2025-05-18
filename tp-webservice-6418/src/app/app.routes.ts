import { Routes } from '@angular/router';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
export const routes: Routes = [

    {path: 'noticias', component: NoticiasComponent},

    { path: '', redirectTo: '/noticias', pathMatch: 'full' },
    { path: '**', redirectTo: '/noticias' }

];
