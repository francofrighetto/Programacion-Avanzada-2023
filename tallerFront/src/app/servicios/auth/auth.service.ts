import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoint/endpoints';
import { User } from 'src/app/modelos/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private http:HttpClient) { }

  login(user:User){
    return this.http.post(environment.apiUrl + endpoints.auth + endpoints.login,user);
  }

  register(user:User){
    return this.http.post(environment.apiUrl + endpoints.auth + endpoints.register,user);
  }
  current(user:User){
    return this.http.post(environment.apiUrl + endpoints.auth + endpoints.current,user);
  }
}
