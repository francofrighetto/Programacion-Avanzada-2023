import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { EstadisticaService } from 'src/app/servicios/estadistica/estadistica.service';



import { ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {


  public formFechas = new FormGroup({
    fechaInicio: new FormControl(
      this.formatoFechaGuion(new Date(1970, 4, 5).toLocaleDateString()), Validators.compose([Validators.required])
    ),

    fechaFin: new FormControl(
      this.formatoFechaGuion(new Date().toLocaleDateString()), Validators.compose([Validators.required])
    )
  });


  estadisticaOrden = {
    noTerminado: 0,
    terminado: 0,
    total: 0
  }

  // ejemplo base
  // public barChartLabels = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  // public barChartType = 'bar';
  // public barChartLegend = true;

  // public barChartData = [
  //   { data: [65, 59, 80, 81], label: 'Series A' },
  //   { data: [28, 48, 40, 19], label: 'Series B' }
  // ];

  mostrarHistograma: boolean = false;
  mostrarCirculo: boolean = false;
  totalPrcentaje: number = 0;
  serviciosLentos: any = [];

  hayCirculo: boolean = false;
  hayHistograma: boolean = false;


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };



  public barChartLabels: any = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any = [
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








  constructor(private estadisticaService: EstadisticaService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.buscarDatos();
  }

  buscarDatos() {
    this.getCantidadServiciosEnDetalleOrden();
    this.getComparacionMinutos();
    this.getEstadsiticaOrden();
  }

  getComparacionMinutos() {
    this.mostrarHistograma = false;
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    this.estadisticaService.comparacionMinutos(this.formatearFechaSQL(this.formFechas.get('fechaInicio')?.value), this.formatearFechaSQL(this.formFechas.get('fechaFin')?.value)).subscribe(data => {
      data.forEach((servicio: any) => {
        this.barChartLabels.push(servicio[0]);
        // real
        this.barChartData[0].data.push(servicio[1].toFixed(2));
        // estimado
        this.barChartData[1].data.push(servicio[2].toFixed(2));
      });

      this.hayHistograma = this.barChartLabels.length>0;
      this.calcularDiferenciaMinutos();

    })
  }


  getCantidadServiciosEnDetalleOrden() {
    this.mostrarCirculo = false;
    this.pieChartData.labels = [];
    this.pieChartData.datasets[0].data = [];
    this.estadisticaService.cantidadServiciosEnDetalleOrden(this.formatearFechaSQL(this.formFechas.get('fechaInicio')?.value), this.formatearFechaSQL(this.formFechas.get('fechaFin')?.value)).subscribe(data => {
      this.totalPrcentaje = 0;

      data.forEach((element: any) => {
        this.totalPrcentaje += element[0];
      })
      data.forEach((element: any) => {
        this.pieChartData.labels?.push(element[1] + " " + (element[0] * 100 / this.totalPrcentaje).toFixed(2) + "%");
        this.pieChartData.datasets[0].data.push(element[0])
      });

      this.mostrarCirculo = true;
      if (this.pieChartData.labels==undefined){
        this.hayCirculo=false;
      }else{
      this.hayCirculo = this.pieChartData.labels.length> 0;
      }
    })

  }

  calcularDiferenciaMinutos() {
    for (let i = 0; i < this.barChartData[0].data.length; i++) {
      if (this.barChartData[0].data[i] - this.barChartData[1].data[i] >= 20) {
        this.serviciosLentos.push(this.barChartLabels[i])
      }
    }
  }



  getEstadsiticaOrden() {
    this.estadisticaService.estadisticaOrden(this.formatearFechaSQL(this.formFechas.get('fechaInicio')?.value), this.formatearFechaSQL(this.formFechas.get('fechaFin')?.value)).subscribe(data => {
      data = data[0];
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



  formatoFechaGuion(fecha: string) {

    let fechaVector = fecha.split("/");
    for (let i = 0; i < fechaVector.length; i++) {
      if (fechaVector[i].length == 1) {
        fechaVector[i] = "0" + fechaVector[i];
      }
    }
    return fechaVector.join("-");
  }

  formatearFechaSQL(fecha: string) {
    if (fecha == "") {
      return "no";
    }

    let fechaVector = fecha.split("-");
    for (let i = 0; i < fechaVector.length; i++) {
      if (fechaVector[i].length == 1) {
        fechaVector[i] = "0" + fechaVector[i];
      }
    }

    if (fechaVector[2].length == 4) {
      fechaVector.unshift(fechaVector[2]);
      fechaVector.pop()
    }
    return fechaVector.join("");
  }


}
