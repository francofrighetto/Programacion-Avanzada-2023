import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/modelos/Marca';
import { MarcaService } from 'src/app/servicios/marca/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcas?: Marca[];
  marca!: Marca;
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
    )
  });

  constructor(private marcaService: MarcaService) {
  }
  ngOnInit(): void {
    this.resetMarca();
    this.getLongitud();
  }

  getMarcas() {
    // this.marcaService.getMarcasHabilitados().subscribe(data => {
    this.marcaService.getMarcasPag(this.pageNumber, this.pageSize).subscribe(data=>{
      this.marcas = data;
    })
  }

  getLongitud() {
    this.marcaService.getLongitud().subscribe(data => {
      this.totalItems = data;
    })
  }


  nuevaMarca() {
    if (this.formRegister.valid) {
      this.marcaService.nuevaMarca(this.marca).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetMarca();
          this.mostrarAlerta("success", "Marca creada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al crear marca");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  actualizarMarca() {
    if (this.formRegister.valid) {
      this.marcaService.actualizarMarca(this.marca).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetMarca();
          this.mostrarAlerta("success", "Marca editada con éxito");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al editar marca");
      })
    } else {
      this.mostrarAlerta("danger", "Validaciones incorrectas");
    }
  }

  editar(marca: Marca) {
    this.nuevo = false;
    this.marca = marca;
  }
  eliminar(marca: Marca) {
    if (marca.id != undefined) {
      this.marcaService.eliminarMarca(marca.id).subscribe((data: any) => {
        if (data.message == "success") {
          this.resetMarca();
          this.mostrarAlerta("success", "Exito al cambiar el estado");
        }
      }, error => {
        console.log(error);
        this.mostrarAlerta("danger", "Error al eliminar marca");
      })
    }
  }

  cancelar() {
    this.marca = new Marca;
    this.marca.estado = true;
    this.nuevo = true;
    this.formRegister.markAsUntouched();
  }

  resetMarca() {
    this.getMarcas();
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

    this.marcaService.getMarcasPag(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.marcas=data;
      });
  }
}
