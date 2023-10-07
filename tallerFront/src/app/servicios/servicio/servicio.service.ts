import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoint/endpoints';
import { Marca } from 'src/app/modelos/Marca';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from 'src/app/modelos/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) { }

  getServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(environment.apiUrl + endpoints.servicio + endpoints.mostrar);
  }

  nuevoServicio(servicio:Servicio){
    return this.http.post(environment.apiUrl + endpoints.servicio + endpoints.nuevo, servicio);
  }

  actualizarServicio(servicio:Servicio){
    return this.http.post(environment.apiUrl + endpoints.servicio + endpoints.editar + "/" + servicio.id, servicio);
  }

  eliminarServicio(id:number){
    return this.http.post(environment.apiUrl + endpoints.servicio + endpoints.eliminar + "/" + id,{});
  }


  getServiciosHabilitados(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(environment.apiUrl + endpoints.servicio + endpoints.mostrarHabilitados);
  }

  getServiciosPag(currentPage:number,pageSize:number): Observable<Servicio[]>{
    const params = { currentPage, pageSize };
    return this.http.get<Servicio[]>(environment.apiUrl + endpoints.servicio + endpoints.mostrarHabilitados, { params });
  }
}
