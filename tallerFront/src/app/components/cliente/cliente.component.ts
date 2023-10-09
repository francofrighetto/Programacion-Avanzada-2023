import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modelos/Cliente';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes?: Cliente[];
  cliente!: Cliente;
  nuevo: boolean = true;

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


  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputDni: new FormControl(
      "", Validators.compose([Validators.required, Validators.pattern(this.dniPatron)])
    ),
    inputTelefono: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputEmail: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputDireccion: new FormControl(
      "", Validators.compose([Validators.required])
    ),
  });

  constructor(private clienteService: ClienteService) {
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
