import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.page.html',
  styleUrls: ['./modificar-datos.page.scss'],
})
export class ModificarDatosPage implements OnInit {
  username: string = '';
  edad!: number;
  estatura!: number;
  peso!: number;

  constructor(private storage: Storage, private navCtrl: NavController) {}

  async ngOnInit() {
    await this.storage.create();
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const user = await this.storage.get('user');
    if (user) {
      this.username = user.username;
      this.edad = user.edad;
      this.estatura = user.estatura;
      this.peso = user.peso;
    }
  }

  async guardarDatos() {
    const user = { username: this.username, edad: this.edad, estatura: this.estatura, peso: this.peso };
    await this.storage.set('user', user);
    this.navCtrl.navigateBack('/principal'); // Regresa a la página principal
  }
}
