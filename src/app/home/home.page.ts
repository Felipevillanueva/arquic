import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = ''; // Aquí se almacena el nombre de usuario ingresado

  constructor(private navCtrl: NavController, private toastController: ToastController, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento
  }

  async goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  async iniciarSesion() {
    if (this.username.trim()) { // Verifica que el username no esté vacío o solo con espacios
      const user = await this.storage.get('user'); // Obtiene el usuario del almacenamiento

      if (user && user.username === this.username) { // Verifica si el usuario está registrado
        console.log('Iniciar sesión');
        this.mostrarBienvenida();
        this.navCtrl.navigateForward(['/principal', { username: this.username }]); // Pasa el nombre de usuario a PrincipalPage
      } else {
        console.error('Usuario no registrado.');
        this.mostrarError('Usuario no registrado.'); // Muestra un error si el usuario no está registrado
      }
    } else {
      console.error('Por favor, ingresa tu nombre de usuario.');
      this.mostrarError('Por favor, ingresa tu nombre de usuario.'); // Muestra un error si no se ingresó el nombre de usuario
    }
  }

  async forgotPassword() {
    console.log('Olvidaste tu contraseña');
    this.navCtrl.navigateForward('/recuperar');
  }

  async mostrarBienvenida() {
    const toast = await this.toastController.create({
      message: `¡Bienvenido, ${this.username}!`, // Muestra el nombre de usuario en el toast
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje, // Notificación de error
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
