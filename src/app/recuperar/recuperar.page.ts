import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  rut: string = '';
  nombre: string = '';
  apellido: string = '';
  nuevaContrasena: string = '';
  repetirContrasena: string = '';

  constructor(private navCtrl: NavController, private toastController: ToastController, private storage: Storage) {}

  ngOnInit() {
    this.storage.create(); // Inicializa el almacenamiento
  }

  async cambiarContrasena() {
    // Validaciones para RUT, nombre y apellido
    if (!this.rut || !this.nombre || !this.apellido) {
      this.mostrarToast('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Validación del formato del RUT
    const rutRegex = /^\d{1,8}-[0-9kK]{1}$/; // Formato: 12345678-9 o 12345678-K
    if (!rutRegex.test(this.rut)) {
      this.mostrarToast('El RUT debe tener el formato correcto (ej: 12345678-9).');
      return;
    }

    if (this.nuevaContrasena !== this.repetirContrasena) {
      this.mostrarToast('Las contraseñas no coinciden.');
      return;
    }

    const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/; // Al menos 8 caracteres, una letra, un número y un carácter especial
    if (!regex.test(this.nuevaContrasena)) {
      this.mostrarToast('La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales.');
      return;
    }

    // Aquí puedes guardar la nueva contraseña en el almacenamiento o en tu backend
    await this.storage.set('password', this.nuevaContrasena); // Ejemplo de almacenamiento

    this.mostrarToast('Contraseña cambiada exitosamente.');
    this.navCtrl.navigateForward('/home'); // Redirige a la página de inicio
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
