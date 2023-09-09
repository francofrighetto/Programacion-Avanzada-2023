import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auto } from 'src/app/modelos/Auto';
import { Marca } from 'src/app/modelos/Marca';
import { Modelo } from 'src/app/modelos/Modelo';
import { AutoService } from 'src/app/servicios/auto/auto.service';
import { MarcaService } from 'src/app/servicios/marca/marca.service';
import { ModeloService } from 'src/app/servicios/modelo/modelo.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  autos?: Auto[];
  auto!: Auto;
  nuevo: boolean = true;

  modelo:Modelo=new Modelo;
  modelos?:Modelo[];

  marca:Marca=new Marca;
  marcas?:Marca[];

  alerta = {
    color: "",
    mensaje: "",
    activo: false
  }

  patentePatron:string = "[A-Z]{2}\\d{3}[A-Z]{2}";
  anioPatron:string="\\d{4}";

  public formRegister = new FormGroup({
    inputPatente: new FormControl(
      "", Validators.compose([Validators.required, Validators.pattern(this.patentePatron)])
    ),
    inputAño: new FormControl(
      "", Validators.compose([Validators.required, Validators.pattern(this.anioPatron)])
    )
  });

  constructor(private autoService: AutoService, private modeloService:ModeloService,
    private marcaService:MarcaService) {
  }
  ngOnInit(): void {
    this.resetAuto();
    this.getMarcas();
  }

  getAutos() {
    this.autoService.getAutos().subscribe(data => {
      this.autos = data;
    })
  }
  getModelosXMarca(id:number) {
    this.modeloService.getModelosXMarca(id).subscribe(data => {
      this.modelos = data;
    })
  }
  getMarcas() {
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
    })
  }

  nuevoAuto() {
    console.log(this.auto);
    if (this.formRegister.valid) {
      this.autoService.nuevoAuto(this.auto).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetAuto();
          this.mostrarAlerta("success", "Auto creado con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear auto");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarAuto() {
    if (this.formRegister.valid) {
      this.autoService.actualizarAuto(this.auto).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetAuto();
          this.mostrarAlerta("success", "Auto editado con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar auto");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(auto: Auto) {
    this.nuevo = false;
    this.auto = auto;
  }

  eliminar(auto: Auto) {
    if (auto.auto_id != undefined) {
      this.autoService.eliminarAuto(auto.auto_id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetAuto();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar auto");
      })
    }
  }

  seleccionarModelo(modelo_id: any) {
    console.log(modelo_id);
    if (modelo_id != undefined && modelo_id.value != undefined) {
      this.auto.modelo.id = modelo_id.value;
    }
  }
  cancelar() {
    this.auto = new Auto;
    this.auto.estado = true;
    this.auto.modelo = new Modelo;
    this.marca= new Marca;
    this.modelos=undefined;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetAuto() {
    this.getAutos();
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

  seleccionarMarca(){
    console.log(this.marca.id);
    if (this.marca.id!=undefined){
      this.getModelosXMarca(this.marca.id);
    }
  }
}
