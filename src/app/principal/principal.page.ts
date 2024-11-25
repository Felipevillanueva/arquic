import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ModificarRutinaComponent } from '../modificar-rutina/modificar-rutina.component';
import { SoporteComponent } from '../soporte/soporte.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  username: string = '';
  edad!: number;
  estatura!: number;
  peso!: number;
  isSubscribed: boolean = false; // Variable para verificar la suscripción
  trainers = [
    { name: 'maria', specialization: 'Fuerza' },
    { name: 'carla', specialization: 'Cardio' },
    { name: 'miguel', specialization: 'Flexibilidad' },
    { name: 'angel', specialization: 'Nutrición' },
  ];
  subscription: any;
  rutina: string = '';
  dieta: string = '';
  mensaje: string = '';

  constructor(
    public navCtrl: NavController,
    private toastController: ToastController,
    private storage: Storage,
    private modalController: ModalController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento
    await this.cargarDatosUsuario(); // Carga los datos del usuario al iniciar
    await this.cargarSuscripcion(); // Carga la suscripción al iniciar
    this.generarRutinaYDieta(); // Genera rutina y dieta al iniciar
  }

  async cargarDatosUsuario() {
    const user = await this.storage.get('user'); // Obtiene el usuario del almacenamiento
    if (user) {
      this.username = user.username;
      this.edad = user.edad;
      this.estatura = user.estatura;
      this.peso = user.peso;
      this.isSubscribed = !!(await this.storage.get('subscription')); // Verifica si hay una suscripción activa
    }
  }

  async cargarSuscripcion() {
    this.subscription = await this.storage.get('subscription'); // Carga la suscripción del almacenamiento
    this.isSubscribed = !!this.subscription; // Verifica si hay una suscripción activa
  }

  generarRutinaYDieta() {
    this.rutina = `Rutina personalizada para ${this.username}:
      - Ejercicio 1: Correr en la cinta (30 minutos)
      - Ejercicio 2: Levantamiento de pesas (3 series de 10 repeticiones)
      - Ejercicio 3: Bicicleta estática (20 minutos)`;

    this.dieta = `Dieta personalizada para ${this.username}:
      - Desayuno: 2 huevos revueltos, 1 tostada integral
      - Almuerzo: Pechuga de pollo a la plancha, ensalada mixta
      - Cena: Pescado al horno, verduras al vapor`;
  }

  async cancelarSuscripcion() {
    await this.storage.remove('subscription'); // Elimina la suscripción del almacenamiento
    this.subscription = null; // Actualiza la variable de suscripción
    this.isSubscribed = false; // Actualiza el estado de suscripción
    const toast = await this.toastController.create({
      message: 'Suscripción cancelada exitosamente.',
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  reservar(trainer: any) {
    if (!this.isSubscribed) {
      this.navCtrl.navigateRoot('/suscripcion'); // Redirige a la página de suscripción
      this.mostrarError('Debes estar suscrito para reservar un entrenador.'); // Notificación
    } else {
      console.log(`Reservado con ${trainer.name}`);
    }
  }

  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async enviarMensaje() {
    if (this.mensaje.trim()) {
      console.log('Mensaje enviado:', this.mensaje);
      this.mensaje = ''; // Limpia el campo de mensaje después de enviar
      const toast = await this.toastController.create({
        message: 'Mensaje enviado exitosamente.',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, escribe un mensaje antes de enviar.',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
    }
  }

  async abrirSoporte() {
    const modal = await this.modalController.create({
      component: SoporteComponent
    });
    return await modal.present();
  }

  async onTiempoFinalizado() {
    const toast = await this.toastController.create({
      message: '¡Tiempo terminado!',
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  async irABitacora() {
    this.navCtrl.navigateForward('/bitacora');
  }

  async borrarCuenta() {
    // Aquí puedes agregar la lógica para eliminar la cuenta del usuario
    await this.storage.remove('user'); // Elimina los datos del usuario del almacenamiento
    await this.storage.remove('subscription'); // Elimina la suscripción si es necesario
    const toast = await this.toastController.create({
      message: 'Cuenta eliminada exitosamente.',
      duration: 2000,
      position: 'top'
    });
    await toast.present();
    this.navCtrl.navigateRoot('/'); // Redirige a la página de inicio
  }

  irASuscripcion() {
    this.router.navigate(['/suscripcion']); // Redirige a la página de suscripción
  }

  volverAlInicio() {
    this.router.navigate(['/']); // Redirige a la página de inicio
  }

  async modificarRutina() {
    const modal = await this.modalController.create({
      component: ModificarRutinaComponent
    });
    return await modal.present();
  }

  calcularEstado(): string {
    if (this.peso && this.estatura) {
      const imc = this.peso / ((this.estatura / 100) ** 2); // Cálculo del IMC
      if (imc < 18.5) {
        return 'Bajo peso';
      } else if (imc >= 18.5 && imc < 24.9) {
        return 'Peso normal';
      } else if (imc >= 25 && imc < 29.9) {
        return 'Sobrepeso';
      } else {
        return 'Obesidad';
      }
    }
    return 'Datos insuficientes'; // Mensaje si no hay datos suficientes
  }
}