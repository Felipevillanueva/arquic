import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  username: string = '';
  edad: number;
  peso: number;
  estatura: number;
  rut: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  ages: number[] = Array.from({ length: 100 }, (_, i) => i + 1); // Rango de 1 a 100

  constructor(private navCtrl: NavController, private toastController: ToastController, private storage: Storage) {
    this.edad = 0;
    this.peso = 0;
    this.estatura = 0;
  }

  ngOnInit() {
    this.storage.create(); // Inicializa el almacenamiento
  }

  async registrar() {
    // Validaciones
    if (!this.username || !this.edad || !this.peso || !this.estatura || !this.rut || !this.contrasena || !this.confirmarContrasena) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos requeridos.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Validación de la edad
    if (this.edad < 18) {
      const toast = await this.toastController.create({
        message: 'Debes tener al menos 18 años para registrarte.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Validación del formato del RUT
    const rutRegex = /^\d{1,8}-[0-9kK]{1}$/; // Formato: 12345678-9 o 12345678-K
    if (!rutRegex.test(this.rut)) {
      const toast = await this.toastController.create({
        message: 'El RUT debe tener el formato correcto (ej: 12345678-9).',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Validación de la contraseña
    const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/; // Al menos 8 caracteres, una letra, un número y un carácter especial
    if (!regex.test(this.contrasena)) {
      const toast = await this.toastController.create({
        message: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Validación de que la contraseña coincida
    if (this.contrasena !== this.confirmarContrasena) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Validación de que la edad, peso y estatura no sean negativos
    if (this.peso < 40 || this.peso > 300 || this.estatura < 0) {
      const toast = await this.toastController.create({
        message: 'El peso debe estar entre 40 kg y 300 kg, y la estatura no puede ser negativa.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Guardar el usuario en el almacenamiento
    await this.storage.set('user', {
      username: this.username,
      edad: this.edad,
      peso: this.peso,
      estatura: this.estatura,
      rut: this.rut,
      contrasena: this.contrasena
    });

    const toast = await this.toastController.create({
      message: 'Registro exitoso.',
      duration: 2000,
      position: 'top'
    });
    toast.present();

    this.navCtrl.navigateBack('/home'); // Redirige a la página de inicio
  }
}
