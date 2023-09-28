import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  constructor() { }

  clientes=[{
    id:1,
    nombre:"valenzoto",
    dni:43604681
  },{
    id:2,
    nombre:"toransa",
    dni:31231231
  }]

  ordenes=[{
    id:1,
    descripcion:"lavado",
    fecha:"1231231",
    total:4360,
    auto:"ferrari",
    estado:true
  },
  {
    id:2,
    descripcion:"cambio aceite",
    fecha:"31232131",
    total:4260,
    auto:"ititio",
    estado:true
  }]

  modal:boolean = false;
  clienteSeleccionado:any = null;
  clienteSeleccioadoSelect: any = ""
  oredenSeleccionada:any = null;

  onClienteSeleccionado(event: any) {
    const clienteId = event.target.value;
    this.clienteSeleccionado = this.clientes.find(cliente => cliente.id === +clienteId);
  }

  onOrdenSeleccionada(event: any) {
    const ordenId = event.target.value;
    this.oredenSeleccionada = this.ordenes.find(orden => orden.id === + ordenId);
  }

    
    openModal(){
      this.modal = true;
    }
  
    closeModal(){
      this.modal = false;
    }

  ngOnInit(): void {
  }

}
