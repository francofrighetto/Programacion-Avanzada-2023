import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/modelos/Marca';
import { Modelo } from 'src/app/modelos/Modelo';
import { Tecnico } from 'src/app/modelos/Tecnico';
import { MarcaService } from 'src/app/servicios/marca/marca.service';
import { TecnicoService } from 'src/app/servicios/tecnico/tecnico.service';


@Component({
  selector: 'app-modelo',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {

  tecnicos?: Tecnico[];
  tecnico!: Tecnico;
  nuevo: boolean = true;
  dniPatron:string="\\d{8}";



  alerta = {
    color: "",
    mensaje: "",
    activo: false
  }

  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    ),
    inputDni: new FormControl(
      "", Validators.compose([Validators.required, Validators.pattern(this.dniPatron)])
    )
  });

  constructor(private TecnicoService: TecnicoService) {}


  getTecnicos() {
    this.TecnicoService.getTecnicosHabilitados().subscribe(data => {
      console.log(data)
      this.tecnicos = data;
    })
  }

  eliminar(tecnico: Tecnico) {
    console.log(tecnico);
    if (tecnico.id != undefined) {
      this.TecnicoService.eliminarTecnico(tecnico.id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetTecnico();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar modelo");
      })
    }
  }

  cancelar() {
    this.tecnico = new Tecnico;
    this.tecnico.estado = true;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetTecnico() {
    this.getTecnicos();
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

  nuevaTecnico() {
    console.log(this.tecnico);
    if (this.formRegister.valid) {
      this.TecnicoService.nuevaTecnico(this.tecnico).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetTecnico();
          this.mostrarAlerta("success", "Tecnico creada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear tecnico");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarTecnico() {
    if (this.formRegister.valid) {
      this.TecnicoService.actualizarTecnico(this.tecnico).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetTecnico();
          this.mostrarAlerta("success", "Tecnico editad con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar modelo");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(tecnico: Tecnico) {
    this.nuevo = false;
    this.tecnico = tecnico;
  }

  ngOnInit(): void {
    this.resetTecnico();
  }

 /*  getMarcas() {
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
      console.log(this.modelos)
    })
  }

  nuevaModelo() {
    console.log(this.modelo);
    if (this.formRegister.valid) {
      this.modeloService.nuevaModelo(this.modelo).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetModelo();
          this.mostrarAlerta("success", "Modelo creada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear modelo");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarModelo() {
    if (this.formRegister.valid) {
      this.modeloService.actualizarModelo(this.modelo).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetModelo();
          this.mostrarAlerta("success", "Modelo editada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar modelo");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(modelo: Modelo) {
    this.nuevo = false;
    this.modelo = modelo;
  }

  eliminar(modelo: Modelo) {
    console.log(modelo);
    if (modelo.id != undefined) {
      this.modeloService.eliminarModelo(modelo.id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetModelo();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar modelo");
      })
    }
  }

  cancelar() {
    this.modelo = new Modelo;
    this.modelo.estado = true;
    this.modelo.marca = new Marca;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetModelo() {
    this.getModelos();
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


  seleccionarMarca(marca_id: any) {
    if (marca_id != undefined && marca_id.value != undefined) {
      this.modelo.marca.id = marca_id.value;
    }
  }
 */
}
