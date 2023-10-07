import { Injectable } from '@angular/core';
import { Modelo } from 'src/app/modelos/Modelo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/endpoint/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http:HttpClient) { }


  getModelos(): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(environment.apiUrl + endpoints.modelo + endpoints.mostrar);
  }

  getModelosHabilitados(): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(environment.apiUrl + endpoints.modelo + endpoints.mostrarHabilitados);
  }

  getModelosXMarca(idMarca:number): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(environment.apiUrl + endpoints.modelo + endpoints.mostrarXMarca +"/"+idMarca);
  }

  nuevaModelo(modelo:Modelo){
    return this.http.post(environment.apiUrl + endpoints.modelo + endpoints.nuevo, modelo);
  }

  actualizarModelo(modelo:Modelo){
    return this.http.post(environment.apiUrl + endpoints.modelo + endpoints.editar + "/" + modelo.id, modelo);
  }
  eliminarModelo(id:number){
    return this.http.post(environment.apiUrl + endpoints.modelo + endpoints.eliminar + "/" + id,{});
  }

  getModelosPag(page:number,size:number): Observable<Modelo[]>{
    const params = { page, size };
    return this.http.get<Modelo[]>(environment.apiUrl + endpoints.modelo + endpoints.mostrarpaginado, { params });
  }
}
