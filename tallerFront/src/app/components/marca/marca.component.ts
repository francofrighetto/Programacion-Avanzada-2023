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
  marca:Marca= new Marca;

  constructor(private marcaService:MarcaService){
    this.marca.estado=true;
  }
  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(){
    this.marcaService.getMarcas().subscribe(data=>{
      this.marcas=data;
    })
  }

  nuevaMarca(){
    this.marcaService.nuevaMarca(this.marca).subscribe(data=>{

      console.log(data);
      if (data=="success"){
        this.getMarcas();
      }
    },error=>{
      if (error.status==200){
        this.getMarcas();

      }
    })
  }

}
