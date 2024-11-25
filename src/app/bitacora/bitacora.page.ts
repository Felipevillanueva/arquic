import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

interface Ejercicio {
  nombre: string;
  completado: boolean;
}

interface BitacoraEntry {
  nombre: string;
  estado: string;
  fecha: Date;
}

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})
export class BitacoraPage implements OnInit {
  ejercicios: Ejercicio[] = [
    { nombre: 'Correr 30 minutos', completado: false },
    { nombre: 'Levantamiento de pesas (3 series de 10 repeticiones)', completado: false },
    { nombre: 'Bicicleta estática (20 minutos)', completado: false },
    { nombre: 'Yoga (30 minutos)', completado: false },
    { nombre: 'Entrenamiento de fuerza (30 minutos)', completado: false },
  ];

  bitacora: BitacoraEntry[] = []; // Array para almacenar el historial de cambios

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  ngOnInit() {}

  toggleCompletado(ejercicio: Ejercicio) {
    ejercicio.completado = !ejercicio.completado; // Cambia el estado de completado
    this.registrarBitacora(ejercicio); // Registra el cambio en la bitácora
  }

  registrarBitacora(ejercicio: Ejercicio) {
    const estado = ejercicio.completado ? 'Completado' : 'Pendiente';
    this.bitacora.push({
      nombre: ejercicio.nombre,
      estado: estado,
      fecha: new Date(),
    });
  }

  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000,
        position: 'top'
    });
    await toast.present();
  }

  irAlInicio() {
    this.navCtrl.navigateBack('/principal');
  }

  get tareasPendientes() {
    return this.ejercicios.filter(ejercicio => !ejercicio.completado);
  }

  get tareasCompletadas() {
    return this.ejercicios.filter(ejercicio => ejercicio.completado);
  }

  verificarEjercicios() {
    if (this.ejercicios.length === 0) {
        this.mostrarError('No has realizado ningún ejercicio.'); // Notificación
    }
  }
}