import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoint/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {


  constructor(private http:HttpClient) { }

  comparacionMinutos(fechaInferior:string, fechaSuperior:string): Observable<any>{
    return this.http.get<any>(environment.apiUrl + endpoints.estadistica + endpoints.comparacionMinutos+"/"+fechaInferior+"/"+fechaSuperior);
  }

  estadisticaOrden(fechaInferior:string, fechaSuperior:string): Observable<any>{
    return this.http.get<any>(environment.apiUrl + endpoints.estadistica + endpoints.estadisticaOrden+"/"+fechaInferior+"/"+fechaSuperior);
  }

  cantidadServiciosEnDetalleOrden(fechaInferior:string, fechaSuperior:string): Observable<any>{
    return this.http.get<any>(environment.apiUrl + endpoints.estadistica + endpoints.cantidadServiciosDetalle+"/"+fechaInferior+"/"+fechaSuperior);

  }

}
