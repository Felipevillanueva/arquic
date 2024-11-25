import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PagoModalComponent } from '../pago-modal/pago-modal.component';

@Component({
  selector: 'app-supcripcion',
  templateUrl: './supcripcion.page.html',
  styleUrls: ['./supcripcion.page.scss'],
})
export class SupcripcionPage implements OnInit {
  subscription: any; // Para almacenar la suscripción actual

  constructor(
    private storage: Storage,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.storage.create(); // Inicializa el almacenamiento
    this.cargarSuscripcion(); // Carga la suscripción al iniciar
  }

  async cargarSuscripcion() {
    this.subscription = await this.storage.get('subscription'); // Carga la suscripción del almacenamiento
  }

  async abrirModal(plan: string, precio: number) {
    const modal = await this.modalController.create({
      component: PagoModalComponent,
      componentProps: { plan, precio }
    });
    modal.onDidDismiss().then(async (data) => {
      if (data.data) {
        await this.suscribirse(data.data.plan, data.data.precio); // Suscribirse con los datos del modal
      }
    });
    return await modal.present();
  }

  async suscribirse(plan: string, precio: number) {
    await this.storage.set('subscription', { plan, precio });
    const toast = await this.toastController.create({
      message: `Te has suscrito al ${plan}.`,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
    this.router.navigate(['/principal']); // Redirige a la página principal
  }

  async cancelarSuscripcion() {
    await this.storage.remove('subscription'); // Elimina la suscripción del almacenamiento
    this.subscription = null; // Actualiza la variable de suscripción
    const toast = await this.toastController.create({
      message: 'Suscripción cancelada exitosamente.',
      duration: 2000,
      position: 'top'
    });
    await toast.present();
    this.router.navigate(['/principal']); // Redirige a la página principal
  }

  volverAlInicio() {
    this.router.navigate(['/principal']); // Redirige a la página principal
  }
}