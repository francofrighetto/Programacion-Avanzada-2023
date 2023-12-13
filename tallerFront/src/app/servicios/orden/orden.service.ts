import { Injectable } from '@angular/core';
import { Orden } from 'src/app/modelos/Orden';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/endpoint/endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http:HttpClient) { }

  getOrdenes(): Observable<Orden[]>{
    return this.http.get<Orden[]>(environment.apiUrl + endpoints.orden + endpoints.mostrar);
  }

  getOrdenesHabilitados(): Observable<Orden[]>{
    return this.http.get<Orden[]>(environment.apiUrl + endpoints.orden + endpoints.mostrarHabilitados);
  }

  getOrdenesXMarca(idMarca:number): Observable<Orden[]>{
    return this.http.get<Orden[]>(environment.apiUrl + endpoints.orden + endpoints.mostrarXMarca +"/"+idMarca);
  }

  getUltimaCliente(idCliente:number){
    return this.http.get(environment.apiUrl + endpoints.orden + endpoints.mostrar+"/"+endpoints.ultima +"/"+idCliente);
  }

  nuevaOrden(orden:Orden){
    return this.http.post(environment.apiUrl + endpoints.orden + endpoints.nuevo, orden);
  }

  actualizarOrden(orden:Orden){
    return this.http.post(environment.apiUrl + endpoints.orden + endpoints.editar + "/" + orden.id, orden);
  }
  eliminarOrden(id:number){
    return this.http.post(environment.apiUrl + endpoints.orden + endpoints.eliminar + "/" + id,{});
  }
  getOrdenesPag(page:number,size:number): Observable<Orden[]>{
    const params = { page, size };
    return this.http.get<Orden[]>(environment.apiUrl + endpoints.orden + endpoints.mostrarpaginado, { params });
  }
  getOrdenesFiltrar(page:number, size:number, nombre:string): Observable<Orden[]>{
    const params = { page, size };
    return this.http.get<Orden[]>(environment.apiUrl + endpoints.orden + endpoints.mostrar + '/' + nombre);
  }
}
