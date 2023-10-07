import { Injectable } from '@angular/core';
import { Tecnico } from 'src/app/modelos/Tecnico';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/endpoint/endpoints';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http:HttpClient) { }


/*   getModelos(): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(environment.apiUrl + endpoints.modelo + endpoints.mostrar);
  } */

  getTecnicosHabilitados(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(environment.apiUrl + endpoints.tecnico + endpoints.mostrarHabilitados);
  }

 /*  getModelosXMarca(idMarca:number): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(environment.apiUrl + endpoints.modelo + endpoints.mostrarXMarca +"/"+idMarca);
  } */

  nuevaTecnico(tecnico:Tecnico){
    return this.http.post(environment.apiUrl + endpoints.tecnico + endpoints.nuevo, tecnico);
  }

  actualizarTecnico(tecnico:Tecnico){
    return this.http.post(environment.apiUrl + endpoints.tecnico + endpoints.editar + "/" + tecnico.id, tecnico);
  }

  eliminarTecnico(id:number){
    return this.http.post(environment.apiUrl + endpoints.tecnico + endpoints.eliminar + "/" + id,{});
  }

  getTecnicosPag(page:number,size:number): Observable<Tecnico[]>{
    const params = { page, size };
    return this.http.get<Tecnico[]>(environment.apiUrl + endpoints.tecnico + endpoints.mostrarpaginado, { params });
  }
}
