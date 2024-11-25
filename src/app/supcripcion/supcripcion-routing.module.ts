import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupcripcionPage } from './supcripcion.page';

const routes: Routes = [
  {
    path: '',
    component: SupcripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupcripcionPageRoutingModule {}