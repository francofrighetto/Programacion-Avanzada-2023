import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auto } from 'src/app/modelos/Auto';
import { Cliente } from 'src/app/modelos/Cliente';
import { Marca } from 'src/app/modelos/Marca';
import { Modelo } from 'src/app/modelos/Modelo';
import { AutoService } from 'src/app/servicios/auto/auto.service';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { MarcaService } from 'src/app/servicios/marca/marca.service';
import { ModeloService } from 'src/app/servicios/modelo/modelo.service';
import { Router } from '@angular/router';
import { Orden } from 'src/app/modelos/Orden';
import { OrdenService } from 'src/app/servicios/orden/orden.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})


export class AutoComponent implements OnInit {


  // Variable para abrir y cerrar el MODAL.
  modal: boolean = false;


  autos?: Auto[];
  auto!: Auto;
  nuevo: boolean = true;

  patentebuscar: string = "";

  modelo:Modelo=new Modelo;
  modelos?:Modelo[];

  marca:Marca=new Marca;
  marcas?:Marca[];

  cliente:Cliente = new Cliente;
  clientes?:Cliente[];

  ordenesParaMostrar:any = []
  ordenes?:Orden[];

  // paginado
  pageNumber: number = 0;
  pageSize: number = 10;
  totalItems?: number;

  // esta variable la uso para ver el cliente cuando aprieto el btn "Ver" en la lista de autos.
  verCliente:Cliente = {}

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

  getOrdenes(){
    this.ordenService.getOrdenesHabilitados().subscribe(data=>{
      this.ordenes = data;
      console.log("ordenes")
      console.log(data)
    })
  }

  constructor(private autoService: AutoService, private modeloService:ModeloService,
    private marcaService:MarcaService, private clienteService: ClienteService,private router: Router,
    private ordenService: OrdenService) {
  }
  ngOnInit(): void {
    this.resetAuto();
    this.getMarcas();
    this.getClientes();
    this.getOrdenes();
  }

  //Abrir modal para ver cliente y servicios del auto.
  openModal(auto:any){
    // Guardo las variables para mostrarlas en el modal.
    this.verCliente.nombre = auto.cliente.nombre
    this.verCliente.estado = auto.cliente.estado
    this.verCliente.dni = auto.cliente.dni
    this.verCliente.telefono = auto.cliente.telefono
    this.verCliente.email = auto.cliente.email
    this.verCliente.id = auto.cliente.id

    this.modal = true;
    this.calcularOrdenXCliente(this.verCliente.id)

  }

  calcularOrdenXCliente(id:any){
    // Guardo las ordenes que coinciden con el id del cliente para mostrarlas luego.
    this.ordenesParaMostrar = []
    if(this.ordenes!=undefined)
    for(let i=0;this.ordenes.length>0;i++){
      if(this.ordenes[i].auto.cliente.id === id ){
        var orden = {
          id: this.ordenes[i].id,
          tecnico: this.ordenes[i].tecnico.nombre,
          descripcion: this.ordenes[i].descripcion,
          fechaInicio: this.ordenes[i].fechaInicio,
          total: this.ordenes[i].total
        }
        if(this.ordenesParaMostrar>0){
          for(let j=0;this.ordenesParaMostrar.length>0; j++){
            if(this.ordenesParaMostrar[j].id != orden.id){
              this.ordenesParaMostrar.push(orden)
            }
          }
        } else this.ordenesParaMostrar.push(orden)
      }
    }
  }

  buscar(){
    if(this.patentebuscar!=""){
      this.autoService.buscarPorPatente(this.pageNumber, this.pageSize, this.patentebuscar)
      .subscribe(data => {
        this.autos=data;
      });
    }else{
      this.getAutos();
    }
  }

  closeModal(){
    this.modal = false;
  }

  getAutos() {
    this.autoService.getAutosPag(this.pageNumber, this.pageSize).subscribe(data=>{
      this.autos = data;
      console.log("autos")
      console.log(data)
    })
  }
  getModelosXMarca(id:number) {
    this.modeloService.getModelosXMarca(id).subscribe(data => {
      this.modelos = data;
      console.log("modelos")
      console.log(data)
    })
  }
  getMarcas() {
    this.marcaService.getMarcasHabilitados().subscribe(data => {
      this.marcas = data;
    })
  }

  getClientes() {
    this.clienteService.getClientesHabilitados().subscribe(data => {
      this.clientes = data;
      console.log("clientes")
      console.log(data)
    })
  }

  redirigirHaciaOrden(){
    this.router.navigate(['/home/orden']);
  }

  nuevoAuto() {
    // Agarro el id del cliente que viene del formulario y se lo sobreescribo en el atributo "cliente"
    //  como un objeto para que sea aceptado por el Backend.
    var cliente = this.auto.cliente
    this.auto.cliente = {id:cliente}
  /*   this.auto.cliente = {Cliente: {id: this.auto.cliente}}; */
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
    this.marca.id = auto.modelo.marca.id;
    this.seleccionarMarca();
  }

  eliminar(auto: Auto) {
    if (auto.id != undefined) {
      this.autoService.eliminarAuto(auto.id).subscribe((data: any) => {
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
    if (this.marca.id!=undefined){
      this.getModelosXMarca(this.marca.id);
    }
  }

  onPageChange(event: any) {
    console.log(event);
    this.pageNumber = event.pageIndex;

    this.autoService.getAutosPag(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.autos=data;
      });
  }
}
