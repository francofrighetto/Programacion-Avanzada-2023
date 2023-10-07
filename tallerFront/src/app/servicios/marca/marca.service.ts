import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoint/endpoints';
import { Marca } from 'src/app/modelos/Marca';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http:HttpClient) { }

  getMarcas(): Observable<Marca[]>{
    return this.http.get<Marca[]>(environment.apiUrl + endpoints.marca + endpoints.mostrar);
  }

  nuevaMarca(marca:Marca){
    return this.http.post(environment.apiUrl + endpoints.marca + endpoints.nuevo, marca);
  }

  actualizarMarca(marca:Marca){
    return this.http.post(environment.apiUrl + endpoints.marca + endpoints.editar + "/" + marca.id, marca);
  }

  eliminarMarca(id:number){
    return this.http.post(environment.apiUrl + endpoints.marca + endpoints.eliminar + "/" + id,{});
  }


  getMarcasHabilitados(): Observable<Marca[]>{
    return this.http.get<Marca[]>(environment.apiUrl + endpoints.marca + endpoints.mostrarHabilitados);
  }

  getMarcasPag(page:number,size:number): Observable<Marca[]>{
    const params = { page, size };
    return this.http.get<Marca[]>(environment.apiUrl + endpoints.marca + endpoints.mostrarpaginado, { params });
  }

  getLongitud():Observable<number>{
    return this.http.get<number>(environment.apiUrl + endpoints.marca + endpoints.longitud);
  }



}
