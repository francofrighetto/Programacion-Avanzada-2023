import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoint/endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from 'src/app/modelos/Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(environment.apiUrl + endpoints.cliente + endpoints.mostrar);
  }

  nuevoCliente(cliente:Cliente){
    return this.http.post(environment.apiUrl + endpoints.cliente + endpoints.nuevo, cliente);
  }

  actualizarCliente(cliente:Cliente){
    return this.http.post(environment.apiUrl + endpoints.cliente + endpoints.editar + "/" + cliente.id, cliente);
  }
  eliminarCliente(id:number){
    return this.http.post(environment.apiUrl + endpoints.cliente + endpoints.eliminar + "/" + id,{});
  }
}
