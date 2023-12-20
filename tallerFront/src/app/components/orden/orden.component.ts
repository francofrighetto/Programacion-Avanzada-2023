import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auto } from 'src/app/modelos/Auto';
import { Orden } from 'src/app/modelos/Orden';
import { AutoService } from 'src/app/servicios/auto/auto.service';
import { OrdenService } from 'src/app/servicios/orden/orden.service';
import { Tecnico } from 'src/app/modelos/Tecnico';
import { TecnicoService } from 'src/app/servicios/tecnico/tecnico.service';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { Servicio } from 'src/app/modelos/Servicio';
import { DetalleOrden } from 'src/app/modelos/DetalleOrden';
import { DetalleOrdenService } from 'src/app/servicios/detalleOrden/detalle-orden.service';
import { DatePipe } from '@angular/common';
import { GeneradorPdfService } from 'src/app/servicios/generador-pdf/generador-pdf.service';
import { EstadoService } from 'src/app/servicios/estado/estado.service';
import { Estado } from 'src/app/modelos/Estado';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  modalVer: boolean = false;
  modalFin: boolean = false;

  ordenes?: Orden[];
  orden!: Orden;
  nuevo: boolean = true;
  verOrden: Orden = {
    total: 0,
    detalle: [],
  };
  nuevoDetalle: DetalleOrden = new DetalleOrden();

  mostrarDetalle: any;

  estados?: Estado[];

  autos!: Auto[];
  auto: Auto = new Auto;

  tecnicos!: Tecnico[];
  tecnico: Tecnico = new Tecnico;

  servicios!: Servicio[];
  servicio: Servicio = new Servicio;

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

  errorFin:boolean=false;

  public formFechas = new FormGroup({
    fechaInicio: new FormControl(
      this.formatoFechaGuion(new Date(1970, 4, 5).toLocaleDateString()), Validators.compose([Validators.required])
    ),

    fechaFin: new FormControl(
      this.formatoFechaGuion(new Date().toLocaleDateString()), Validators.compose([Validators.required])
    )
  });


  public formFin = new FormGroup({
    // inputMinRealizado: new FormControl("", [Validators.required, Validators.min(1)])
    inputFechaFin: new FormControl("")

  })

  public formRegister = new FormGroup({
    inputDescripcion: new FormControl(
      "", Validators.compose([Validators.required])
    ),

    inputFecha: new FormControl(
      "", Validators.compose([Validators.required])
    ),

    inputCantidad1: new FormControl(""),
    inputCantidad2: new FormControl(""),
    inputCantidad3: new FormControl(""),
    inputCantidad4: new FormControl(""),
    inputCantidad5: new FormControl(""),
    inputCantidad6: new FormControl(""),
    inputCantidad7: new FormControl(""),
    inputCantidad8: new FormControl(""),
    inputCantidad9: new FormControl(""),
    inputCantidad10: new FormControl(""),
    inputCantidad11: new FormControl(""),
    inputCantidad12: new FormControl(""),
    inputCantidad13: new FormControl(""),
    inputCantidad14: new FormControl(""),
    inputCantidad15: new FormControl(""),




  });

  constructor(private ordenService: OrdenService, private autoService: AutoService, private tecnicoService: TecnicoService,
    private servicioService: ServicioService, private cdr: ChangeDetectorRef, private detalleOrdenService: DetalleOrdenService,
    private generadorPdfService: GeneradorPdfService, private estadoService: EstadoService) {
  }
  ngOnInit(): void {
    this.buscarDatos();
  }

  buscarDatos() {
    this.resetOrden();
    this.getAutos();
    this.getTecnicos();
    this.getServicios();
    this.getEstados();
  }

  openModal(orden: any) {
    // Guardo las variables para mostrarlas en el modal.
    this.verOrden.descripcion = orden.descripcion
    this.verOrden.detalle = orden.detalle
    this.modalVer = true;

  }

  openModalFin(orden: any) {
    this.verOrden = orden;
    // this.verOrden.descripcion = orden.descripcion;
    // this.verOrden.detalle = orden.detalle;
    this.modalFin = true;
    let i=0;
    this.verOrden.detalle.forEach(e=>{
      this.formFin.addControl("inputMinRealizado"+i, new FormControl("", [Validators.required, Validators.min(1)]));
      i++;
    })

  }

  closeModal() {
    this.modalVer = false;
    this.modalFin = false;

  }

  getOrdenes() {
    this.ordenService.getOrdenesPag(this.pageNumber, this.pageSize).subscribe(data => {
      this.ordenes = data;
    })
  }
  getAutos() {
    this.autoService.getAutosHabilitados().subscribe(data => {
      this.autos = data;
    })
  }
  getTecnicos() {
    this.tecnicoService.getTecnicosHabilitados().subscribe(data => {
      this.tecnicos = data;
    })
  }

  getEstados() {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
      console.log(this.estados);
    })
  }

  getServicios() {
    this.servicioService.getServicios().subscribe(data => {
      this.servicios = data;
    })
  }

  nuevaOrden() {
    this.orden.estado = this.estados![0];
    if (this.formRegister.valid) {
      this.ordenService.nuevaOrden(this.orden).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetOrden();
          this.mostrarAlerta("success", "Orden creada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear orden");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarOrden() {
    if (this.formRegister.valid) {
      this.ordenService.actualizarOrden(this.orden).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetOrden();
          this.mostrarAlerta("success", "Orden editada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar orden");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(orden: Orden) {
    this.nuevo = false;
    this.detalleOrdenService.getDetalleOrden(orden.id!).subscribe((data: any) => {
      console.log(data);
      if (data != undefined && data.length != 0) {
        this.orden = data[0].orden;
        this.calcularTotal();
        if (this.orden.fechaInicio != undefined && this.orden.fechaInicio != null) {
          this.orden.fechaInicio = this.formatearFecha(this.orden.fechaInicio)!;
        }
      }
    })
  }

  eliminar(orden: Orden) {
    if (orden.id != undefined) {
      this.ordenService.eliminarOrden(orden.id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetOrden();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar orden");
      })
    }
  }
  buscar() {
    if (this.nombrebuscar != "") {
      this.ordenService.getOrdenesFiltrar(this.pageNumber, this.pageSize, this.nombrebuscar, this.formatearFechaSQL(this.formFechas.get('fechaInicio')?.value), this.formatearFechaSQL(this.formFechas.get('fechaFin')?.value))
        .subscribe(data => {
          this.ordenes = data;
        });
    } else {
      this.getOrdenes();
    }
  }

  quitarFila(i: number) {
    console.log(this.orden.detalle)
    this.orden.detalle?.splice(i, 1);
    console.log(this.orden.detalle)
    this.cdr.detectChanges();
    this.calcularTotal();

  }

  agregarFila() {
    this.orden.detalle?.push(this.nuevoDetalle);
    this.nuevoDetalle = new DetalleOrden();
    this.cdr.detectChanges();
    this.calcularTotal();
  }

  cancelar() {
    this.orden = new Orden;
    // this.orden.fechaInicio=new Date().toLocaleDateString();
    this.orden.fechaInicio = "2023/05/05";
    this.orden.total = 0;
    this.orden.habilitado = true;
    this.orden.auto = new Auto;
    this.orden.tecnico = new Tecnico;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetOrden() {
    this.getOrdenes();
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

  seleccionarAuto(auto_id: any) {
    if (auto_id != undefined && auto_id.value != undefined) {
      this.orden.auto.id = auto_id.value;
    }
  }
  seleccionarTecnico(tecnico_id: any) {
    if (tecnico_id != undefined && tecnico_id.value != undefined) {
      this.orden.tecnico.id = tecnico_id.value;
    }
  }
  onPageChange(event: any) {
    this.pageNumber = event.pageIndex;

    this.ordenService.getOrdenesPag(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.ordenes = data;
      });
  }

  calcularTotal() {
    this.orden.detalle.forEach(e => {
      let precio_servicio = 0;
      this.servicios.forEach(s => {
        if (s.id == e.servicio.id) {
          console.log(s);
          precio_servicio = s.precio!;
          e.subtotal = e.cantidad! * precio_servicio!;
          console.log(e.subtotal);
        }
      })

    });
    let total = 0;
    this.orden.detalle.forEach(e => {
      total += e.subtotal!;
    });
    this.orden.total = total;

  }

  cambioCantidad(i: number, event: any) {
    console.log(this.orden.detalle[i].cantidad);
    let valorInput = parseFloat((event.target as HTMLInputElement).value);
    this.orden.detalle[i].cantidad = valorInput;
    console.log(this.orden.detalle[i].cantidad);

    this.calcularTotal();
  }

  formatearFecha(fechaModel: any) {
    const fecha = new Date(fechaModel);
    const datePipe = new DatePipe('en-US');
    const fechaFormateada = datePipe.transform(fecha, 'yyyy-MM-dd');

    return fechaFormateada;
  }

  ver(orden: any) {
    this.detalleOrdenService.getDetalleOrden(orden.id!).subscribe((data: any) => {
      if (data != undefined && data.length != 0) {
        this.mostrarDetalle = data[0].orden;
      }
    })

  }

  finalizar() {
    if (this.formFin.valid) {
      this.errorFin=false;
      this.verOrden.estado = this.estados![1];
      this.ordenService.actualizarOrden(this.verOrden).subscribe(data => {
        this.closeModal();
        this.mostrarAlerta("success", "Exito al finalizar orden");
        this.getOrdenes();
      })
    }else{
      this.errorFin=true;
    }
  }


  generarFactura(orden: Orden) {
    const datos = {
      servicios: orden.detalle,
      cliente: orden.auto.cliente,
      auto: orden.auto,
    }
    this.generadorPdfService.generarFactura(datos);
  }



  formatoFechaGuion(fecha: string) {

    let fechaVector = fecha.split("/");
    for (let i = 0; i < fechaVector.length; i++) {
      if (fechaVector[i].length == 1) {
        fechaVector[i] = "0" + fechaVector[i];
      }
    }
    return fechaVector.join("-");
  }

  formatearFechaSQL(fecha: string) {
    if (fecha == "") {
      return "no";
    }

    let fechaVector = fecha.split("-");
    for (let i = 0; i < fechaVector.length; i++) {
      if (fechaVector[i].length == 1) {
        fechaVector[i] = "0" + fechaVector[i];
      }
    }

    if (fechaVector[2].length == 4) {
      fechaVector.unshift(fechaVector[2]);
      fechaVector.pop()
    }
    return fechaVector.join("");
  }


}
