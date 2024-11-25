import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.scss'],
})
export class TemporizadorComponent {
  tiempo: number = 1; // Tiempo en minutos
  tiempoRestante: number = this.tiempo * 60; // Inicializa el tiempo restante en segundos
  isRunning: boolean = false; // Estado del temporizador
  interval: any; // Variable para almacenar el intervalo
  @Output() tiempoFinalizado = new EventEmitter<void>();

  iniciarTemporizador() {
    this.isRunning = true;
    this.tiempoRestante = this.tiempo * 60; // Reinicia el tiempo restante
    this.interval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.interval);
        this.isRunning = false;
        this.tiempoFinalizado.emit();
      }
    }, 1000);
  }

  detenerTemporizador() {
    clearInterval(this.interval); // Detiene el temporizador
    this.isRunning = false; // Cambia el estado a no en ejecución
  }

  reiniciarTemporizador() {
    this.tiempoRestante = this.tiempo * 60; // Reinicia el tiempo restante
    this.isRunning = false; // Detiene el temporizador
  }

  cambiarTiempo(nuevoTiempo: number) {
    this.tiempo = nuevoTiempo;
    this.tiempoRestante = nuevoTiempo * 60; // Actualiza el tiempo restante al nuevo tiempo
  }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${minutos} min ${segundos} seg`;
  }
}
