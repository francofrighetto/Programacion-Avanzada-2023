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
  getAutosHabilitados(): Observable<Auto[]>{
    return this.http.get<Auto[]>(environment.apiUrl + endpoints.auto + endpoints.mostrarHabilitados);
  }
  nuevoAuto(auto:Auto){
    return this.http.post(environment.apiUrl + endpoints.auto + endpoints.nuevo, auto);
  }

  actualizarAuto(auto:Auto){
    return this.http.post(environment.apiUrl + endpoints.auto + endpoints.editar + "/" + auto.id, auto);
  }

  getAutosPag(page:number,size:number): Observable<Auto[]>{
    const params = { page, size };
    return this.http.get<Auto[]>(environment.apiUrl + endpoints.auto + endpoints.mostrarpaginado, { params });
  }

  eliminarAuto(id:number){
    return this.http.post(environment.apiUrl + endpoints.auto + endpoints.eliminar + "/" + id,{});
  }

  buscarPorPatente(page:number, size:number, patente:string): Observable<Auto[]>{
    const params = { page, size };
    return this.http.get<Auto[]>(environment.apiUrl + endpoints.auto + endpoints.mostrar + '/' + patente, { params });
  }

}
