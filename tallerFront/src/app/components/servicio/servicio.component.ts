import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Servicio } from 'src/app/modelos/Servicio';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicios?: Servicio[];
  servicio!: Servicio;
  nuevo: boolean = true;

  // paginado
  pageNumber: number = 0;
  pageSize: number = 10;
  totalItems?: number;

  alerta = {
    color: "",
    mensaje: "",
    activo: false
  }

  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputPrecio: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputMinutos: new FormControl(
      "", Validators.compose([Validators.required])
    ),
  });

  constructor(private servicioService: ServicioService) {
  }
  ngOnInit(): void {
    this.resetServicio();
    this.getLongitud();
  }

  getServicios() {
    // this.servicioService.getServiciosHabilitados().subscribe(data => {
    this.servicioService.getServiciosPag(this.pageNumber, this.pageSize).subscribe(data=>{
      this.servicios = data;
    })
  }

  getLongitud() {
    this.servicioService.getLongitud().subscribe(data => {
      this.totalItems = data;
    })
  }


  nuevaServicio() {
    if (this.formRegister.valid) {
      this.servicioService.nuevoServicio(this.servicio).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetServicio();
          this.mostrarAlerta("success", "Servicio creada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear servicio");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarServicio() {
    if (this.formRegister.valid) {
      this.servicioService.actualizarServicio(this.servicio).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetServicio();
          this.mostrarAlerta("success", "Servicio editada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar servicio");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(servicio: Servicio) {
    this.nuevo = false;
    this.servicio = servicio;
  }
  eliminar(servicio: Servicio) {
    if (servicio.id != undefined) {
      this.servicioService.eliminarServicio(servicio.id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetServicio();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar servicio");
      })
    }
  }

  cancelar() {
    this.servicio = new Servicio;
    this.servicio.estado = true;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetServicio() {
    this.getServicios();
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

    this.servicioService.getServiciosPag(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.servicios=data;
      });
  }
}
