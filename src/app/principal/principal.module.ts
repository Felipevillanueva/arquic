import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalPageRoutingModule } from './principal-routing.module';
import { PrincipalPage } from './principal.page';
import { ModificarRutinaComponent } from '../modificar-rutina/modificar-rutina.component';
import { SoporteComponent } from '../soporte/soporte.component';
import { TemporizadorComponent } from '../temporizador/temporizador.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage, ModificarRutinaComponent, SoporteComponent, TemporizadorComponent]
})
export class PrincipalPageModule {}