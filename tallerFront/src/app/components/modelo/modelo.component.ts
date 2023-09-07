import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modelo } from 'src/app/modelos/Modelo';
import { ModeloService } from 'src/app/servicios/modelo/modelo.service';


@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {

  modelos?: Modelo[];
  modelo!: Modelo;
  nuevo: boolean = true;

  alerta = {
    color: "",
    mensaje: "",
    activo: false
  }

  public formRegister = new FormGroup({
    inputNombre: new FormControl(
      "", Validators.compose([Validators.required])
    )
  });

  constructor(private modeloService: ModeloService) {
  }
  ngOnInit(): void {
    this.resetModelo();
  }

  getModelos() {
    this.modeloService.getModelos().subscribe(data => {
      this.modelos = data;
    })
  }

  nuevaModelo() {
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

}
