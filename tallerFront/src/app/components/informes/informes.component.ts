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


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };



  public barChartLabels = [''];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [0], label: 'Real' },
    { data: [0], label: 'Estimado' }
  ];









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
        this.barChartData[0].data.push(servicio[1]);
        // estimado
        this.barChartData[1].data.push(servicio[2]);

      });
      console.log(this.barChartLabels);
      // this.barChartLabels.shift();
      // this.barChartData[0].data.shift();
      // this.barChartData[1].data.shift();

      this.barChartLabels.splice(0,1);
      this.barChartData[0].data.splice(0,1);
      this.barChartData[1].data.splice(0,1);
      this.mostrarHistograma=true;
      console.log(this.barChartLabels);


    })
  }

  getCantidadServiciosEnDetalleOrden(){
    this.estadisticaService.cantidadServiciosEnDetalleOrden().subscribe(data=>{
      console.log(data);
      console.log(data[0]);

      data.forEach((element:any) => {
        this.pieChartData.labels?.push(element[1]);
        this.pieChartData.datasets[0].data.push(element[0])
      });

      this.pieChartData.labels?.shift();
      this.pieChartData.datasets[0].data.shift();
      this.mostrarCirculo=true;

    })
  }

  getEstadsiticaOrden(){
    this.estadisticaService.estadisticaOrden().subscribe(data=>{
      console.log(data)
      data=data[0];
      this.estadisticaOrden.noTerminado = data[0];
      this.estadisticaOrden.terminado = data[1];
      this.estadisticaOrden.total = data[2];
    })
  }






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

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

}
