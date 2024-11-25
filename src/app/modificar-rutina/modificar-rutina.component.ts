import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-rutina',
  templateUrl: './modificar-rutina.component.html',
  styleUrls: ['./modificar-rutina.component.scss'],
})
export class ModificarRutinaComponent {
  @Input() ejercicios: string[] = []; // Recibe la lista de ejercicios desde el componente padre
  ejercicioModificado: string = ''; // Almacena el ejercicio que se va a modificar
  indiceEjercicio: number = -1; // Almacena el índice del ejercicio a modificar

  constructor(private modalController: ModalController) {}

  iniciarModificacion(indice: number) {
    this.indiceEjercicio = indice; // Guarda el índice del ejercicio a modificar
    this.ejercicioModificado = this.ejercicios[indice]; // Carga el ejercicio en el input
  }

  guardarRutina() {
    if (this.indiceEjercicio >= 0) {
      this.ejercicios[this.indiceEjercicio] = this.ejercicioModificado; // Actualiza solo el ejercicio seleccionado
    }
    this.modalController.dismiss(this.ejercicios); // Cierra el modal y devuelve la lista actualizada
  }

  cerrarModal() {
    this.modalController.dismiss(); // Cierra el modal sin guardar
  }
}