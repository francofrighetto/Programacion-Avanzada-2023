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

  comparacionMinutos(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + endpoints.estadistica + endpoints.comparacionMinutos);
  }

  estadisticaOrden(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + endpoints.estadistica + endpoints.estadisticaOrden);
  }

  cantidadServiciosEnDetalleOrden(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + endpoints.estadistica + endpoints.cantidadServiciosDetalle);

  }

}
