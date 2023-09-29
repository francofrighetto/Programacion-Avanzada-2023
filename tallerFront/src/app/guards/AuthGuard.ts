import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';
import { User } from '../modelos/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  user: User = {
    "username": "franco",
    "password": "1234",
    "firstname": "franco",
    "lastname": "frighetto",
    "country": "arg",
    "role": "ADMIN"
  }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.current(this.user).subscribe(
        (data: any) => {
          console.log(data);
          if (data.message === "El usuario ha iniciado sesión como: franco") {
            resolve(true);
          } else {
            this.router.navigate(['/login']);
            resolve(false);
          }
        },
        (error) => {
          console.error('Error en canActivate:', error);
          this.router.navigate(['/login']);
          resolve(false);
        }
      );
    });
  }


}
