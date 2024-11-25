import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create();
    const username = await this.storage.get('username');
    if (username) {
      return true; // Permitir acceso si hay un nombre de usuario
    } else {
      this.router.navigate(['/home']); // Redirigir a la página de inicio si no hay nombre de usuario
      return false;
    }
  }
} 