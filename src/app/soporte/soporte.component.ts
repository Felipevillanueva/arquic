import { Component } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss'],
})
export class SoporteComponent {
  mensaje: string = ''; // Propiedad para almacenar el mensaje

  constructor(
    public toastController: ToastController,
    public storage: Storage,
    public modalController: ModalController
  ) {}

  async enviarMensaje() {
    if (this.mensaje.trim()) { // Verifica que el mensaje no esté vacío
      console.log('Mensaje enviado:', this.mensaje);
      // Aquí puedes guardar el mensaje en el almacenamiento si es necesario
      await this.storage.set('mensajeSoporte', this.mensaje);
      this.mensaje = ''; // Limpia el campo de mensaje después de enviar
      const toast = await this.toastController.create({
        message: 'Mensaje enviado exitosamente.',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
      this.modalController.dismiss(); // Cierra el modal después de enviar
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, escribe un mensaje antes de enviar.',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
    }
  }
}