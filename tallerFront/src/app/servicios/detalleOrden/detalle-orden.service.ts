import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoint/endpoints';
import { DetalleOrden } from 'src/app/modelos/DetalleOrden';
import { Orden } from 'src/app/modelos/Orden';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenService {

  constructor(private http:HttpClient) { }

  getDetalleOrden(idOrden:number){
    return this.http.get(environment.apiUrl + endpoints.detalleOrden + endpoints.mostrar+"/"+idOrden);
  }
}
