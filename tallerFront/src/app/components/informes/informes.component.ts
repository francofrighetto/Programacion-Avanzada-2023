import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';



import { ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {


  estadisticaOrden = {
    noTerminado:0,
    terminado:0,
    total:0
  }

// ejemplo base
  // public barChartLabels = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  // public barChartType = 'bar';
  // public barChartLegend = true;

  // public barChartData = [
  //   { data: [65, 59, 80, 81], label: 'Series A' },
  //   { data: [28, 48, 40, 19], label: 'Series B' }
  // ];

  mostrarHistograma:boolean=false;
  mostrarCirculo:boolean=false;
  totalPrcentaje:number=0;
  serviciosLentos:any=[];


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };



  public barChartLabels:any = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData:any = [
    { data: [], label: 'Real' },
    { data: [], label: 'Estimado' }
  ];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };








  constructor(private estadisticaService:EstadisticaService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCantidadServiciosEnDetalleOrden();

    this.getComparacionMinutos();
    this.getEstadsiticaOrden();
  }

  getComparacionMinutos(){
    this.estadisticaService.comparacionMinutos().subscribe(data=>{
      data.forEach((servicio:any) => {
        this.barChartLabels.push(servicio[0]);
        // real
        this.barChartData[0].data.push(servicio[1].toFixed(2) );
        // estimado
        this.barChartData[1].data.push(servicio[2].toFixed(2));
      });

      this.mostrarHistograma=true;
      this.calcularDiferenciaMinutos();

    })
  }

  calcularDiferenciaMinutos(){
    for (let i=0;i<this.barChartData[0].data.length;i++){
      if (this.barChartData[0].data[i] - this.barChartData[1].data[i] >=20)  {
        this.serviciosLentos.push(this.barChartLabels[i])
      }
    }
  }



  getEstadsiticaOrden(){
    this.estadisticaService.estadisticaOrden().subscribe(data=>{
      data=data[0];
      this.estadisticaOrden.noTerminado = data[0];
      this.estadisticaOrden.terminado = data[1];
      this.estadisticaOrden.total = data[2];
    })
  }








  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [''],
    datasets: [
      {
        data: [0],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [
      'hen',
      'variable',
      'embryo',
      'instal',
      'pleasant',
      'physical',
      'bomber',
      'army',
      'add',
      'film',
      'conductor',
      'comfortable',
      'flourish',
      'establish',
      'circumstance',
      'chimney',
      'crack',
      'hall',
      'energy',
      'treat',
      'window',
      'shareholder',
      'division',
      'disk',
      'temptation',
      'chord',
      'left',
      'hospital',
      'beef',
      'patrol',
      'satisfied',
      'academy',
      'acceptance',
      'ivory',
      'aquarium',
      'building',
      'store',
      'replace',
      'language',
      'redeem',
      'honest',
      'intention',
      'silk',
      'opera',
      'sleep',
      'innocent',
      'ignore',
      'suite',
      'applaud',
      'funny',
    ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map((_) => randomWord());

    this.chart?.update();
  }







  getCantidadServiciosEnDetalleOrden(){
    this.estadisticaService.cantidadServiciosEnDetalleOrden().subscribe(data=>{
      this.totalPrcentaje=0;

      data.forEach((element:any) => {
        this.totalPrcentaje+=element[0];
      })
      data.forEach((element:any) => {
        this.pieChartData.labels?.push(element[1] + " " + (element[0]*100/this.totalPrcentaje).toFixed(2) + "%");
        this.pieChartData.datasets[0].data.push(element[0])
      });

      this.pieChartData.labels?.shift();

      this.pieChartData.datasets[0].data.shift();
      console.log(this.pieChartData.labels);

      this.mostrarCirculo=true;
    })

  }

}
