import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modelos/Cliente';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { OrdenService } from 'src/app/servicios/orden/orden.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  modal: boolean = false;
  clientes?: Cliente[];
  cliente!: Cliente;
  nuevo: boolean = true;
  verCliente:Cliente = {}

  ultimaOrden = {
    "fecha":"",
    "patente":""
  }

    // paginado
    pageNumber: number = 0;
    pageSize: number = 10;
    totalItems?: number;

    nombrebuscar: string = "";
  alerta = {
    color: "",
    mensaje: "",
    activo: false
  }

  dniPatron: string = "\\d{8}";
  dniTelefono: string = "\\d{10}";



  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputDni: new FormControl(
      "", Validators.compose([Validators.required, Validators.pattern(this.dniPatron)])
    ),
    inputTelefono: new FormControl(
      "", Validators.compose([Validators.required, Validators.pattern(this.dniTelefono)])
    ),
    inputEmail: new FormControl(
      "", Validators.compose([Validators.required, Validators.email])
    ),
    inputDireccion: new FormControl(
      "", Validators.compose([Validators.required])
    ),
  });

  constructor(private clienteService: ClienteService, private ordenService:OrdenService) {
  }
  ngOnInit(): void {
    this.resetCliente();
  }

  getClientes() {
    this.clienteService.getClientesPag(this.pageNumber, this.pageSize).subscribe(data=>{
      this.clientes = data;
    })
  }

  nuevoCliente() {
    if (this.formRegister.valid) {
      this.clienteService.nuevoCliente(this.cliente).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetCliente();
          this.mostrarAlerta("success", "Cliente creado con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear cliente");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarCliente() {
    if (this.formRegister.valid) {
      this.clienteService.actualizarCliente(this.cliente).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetCliente();
          this.mostrarAlerta("success", "Cliente editado con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar cliente");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(cliente: Cliente) {
    this.nuevo = false;
    this.cliente = cliente;
  }
  eliminar(cliente: Cliente) {
    if (cliente.id != undefined) {
      this.clienteService.eliminarCliente(cliente.id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetCliente();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar cliente");
      })
    }
  }

  cancelar() {
    this.cliente = new Cliente;
    this.cliente.estado = true;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetCliente() {
    this.getClientes();
    this.cancelar();
  }

  mostrarAlerta(color: string, mensaje: string) {
    this.alerta.color = color;
    this.alerta.mensaje = mensaje;
    this.alerta.activo = true;
    setTimeout(() => {
      this.alerta.activo = false;
    }, 3000);
  }
  onPageChange(event: any) {
    console.log(event);
    this.pageNumber = event.pageIndex;

    this.clienteService.getClientesPag(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.clientes=data;
      });
  }
  openModal(cliente:any){
    // Guardo las variables para mostrarlas en el modal.
    this.verCliente.nombre = cliente.nombre
    this.verCliente.estado = cliente.estado
    this.verCliente.dni = cliente.dni
    this.verCliente.observaciones = cliente.observaciones
    this.modal = true;
    this.ordenService.getUltimaCliente(cliente.id).subscribe((data:any)=>{
      this.ultimaOrden.fecha=data[0][0];
      this.ultimaOrden.patente=data[0][1];
    })

  }
  closeModal(){
    this.modal = false;
  }
  buscar(){
    if(this.nombrebuscar!=""){
      this.clienteService.getClientesFiltrar(this.pageNumber, this.pageSize, this.nombrebuscar)
      .subscribe(data => {
        this.clientes=data;
      });
    }else{
      this.getClientes();
    }
  }
}
