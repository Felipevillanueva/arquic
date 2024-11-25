import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pago-modal',
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.scss'],
})
export class PagoModalComponent implements OnInit {
  numeroTarjeta: string = '';
  nombreTarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';
  plan: string = '';
  precio: number = 0;

  constructor(private modalController: ModalController, private toastController: ToastController) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async realizarPago() {
    if (!this.numeroTarjeta || !this.nombreTarjeta || !this.fechaExpiracion || !this.cvv) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos.',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
      return; // No continuar si hay campos vacíos
    }

    // Aquí puedes agregar la lógica para procesar el pago
    console.log('Pago realizado con:', {
      numeroTarjeta: this.numeroTarjeta,
      nombreTarjeta: this.nombreTarjeta,
      fechaExpiracion: this.fechaExpiracion,
      cvv: this.cvv,
    });
    this.cerrarModal();
  }
}
