import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoint/endpoints';
import { Estado } from 'src/app/modelos/Estado';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http:HttpClient) { }


  getEstados(): Observable<Estado[]>{
    return this.http.get<Estado[]>(environment.apiUrl + endpoints.estado + endpoints.mostrar);
  }
}
