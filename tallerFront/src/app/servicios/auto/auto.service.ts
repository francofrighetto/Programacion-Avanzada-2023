import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoint/endpoints';
import { Auto } from 'src/app/modelos/Auto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutoService {


  constructor(private http:HttpClient) { }

  getAutos(): Observable<Auto[]>{
    return this.http.get<Auto[]>(environment.apiUrl + endpoints.auto + endpoints.mostrar);
  }

  nuevoAuto(auto:Auto){
    return this.http.post(environment.apiUrl + endpoints.auto + endpoints.nuevo, auto);
  }

  actualizarAuto(auto:Auto){
    return this.http.post(environment.apiUrl + endpoints.auto + endpoints.editar + "/" + auto.id, auto);
  }
  eliminarAuto(id:number){
    return this.http.post(environment.apiUrl + endpoints.auto + endpoints.eliminar + "/" + id,{});
  }}
