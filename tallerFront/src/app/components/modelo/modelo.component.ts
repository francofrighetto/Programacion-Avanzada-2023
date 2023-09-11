import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/modelos/Marca';
import { Modelo } from 'src/app/modelos/Modelo';
import { MarcaService } from 'src/app/servicios/marca/marca.service';
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

  marcas!: Marca[];
  marca: Marca = new Marca;

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

  constructor(private modeloService: ModeloService, private marcaService: MarcaService) {
  }
  ngOnInit(): void {
    this.resetModelo();
    this.getMarcas();
  }

  getModelos() {
    this.modeloService.getModelosHabilitados().subscribe(data => {
      this.modelos = data;
    })
  }

  getMarcas() {
    this.marcaService.getMarcasHabilitados().subscribe(data => {
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

}
