import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auto } from 'src/app/modelos/Auto';
import { Orden } from 'src/app/modelos/Orden';
import { AutoService } from 'src/app/servicios/auto/auto.service';
import { OrdenService } from 'src/app/servicios/orden/orden.service';
import { Tecnico } from 'src/app/modelos/Tecnico';
import { TecnicoService } from 'src/app/servicios/tecnico/tecnico.service';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  ordenes?: Orden[];
  orden!: Orden;
  nuevo: boolean = true;


  autos!: Auto[];
  auto: Auto = new Auto;

  tecnicos!: Tecnico[];
  tecnico: Tecnico = new Tecnico;

  alerta = {
    color: "",
    mensaje: "",
    activo: false
  }

  public formRegister = new FormGroup({
    inputDescripcion: new FormControl(
      "", Validators.compose([Validators.required])
    )
  });

  constructor(private ordenService: OrdenService, private autoService: AutoService,private tecnicoService: TecnicoService) {
  }
  ngOnInit(): void {
    this.resetOrden();
    this.getAutos();
    this.getTecnicos();
  }

  getOrdenes() {
    this.ordenService.getOrdenesHabilitados().subscribe(data => {
      this.ordenes = data;
    })
  }
  getAutos() {
    this.autoService.getAutosHabilitados().subscribe(data => {
      this.autos = data;
      console.log(this.ordenes)
    })
  }
  getTecnicos() {
    this.tecnicoService.getTecnicosHabilitados().subscribe(data => {
      this.tecnicos = data;
      console.log(this.ordenes)
    })
  }

  nuevaOrden() {
    console.log(this.orden);
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
    this.orden = orden;
  }

  eliminar(orden: Orden) {
    console.log(orden);
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

  cancelar() {
    this.orden = new Orden;
    this.orden.estado = true;
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

}
