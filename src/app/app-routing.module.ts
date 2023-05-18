import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Crud7Component } from './components/p7/crud7/crud7.component';
import { P72Component } from './components/p7/p72/p72.component';
import { P82Component } from './components/p8/p82/p82.component';
import { Crud8Component } from './components/p8/crud8/crud8.component';
import { Crud9Component } from './components/p9/crud9/crud9.component';
import { Practica92Component } from './components/p9/practica92/practica92.component';

const routes: Routes = [
  { path: '', redirectTo: '/crud7', pathMatch: 'full' },
  { path: 'crud7', component: Crud7Component },
  { path: 'edit7', component: P72Component },
  { path: 'crud8', component: Crud8Component },
  { path: 'edit8', component: P82Component },
  { path: 'crud9', component: Crud9Component },
  { path: 'edit9', component: Practica92Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
