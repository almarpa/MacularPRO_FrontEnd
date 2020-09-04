import { Component, OnInit, ViewChild, Inject  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { GraficaService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { RevisionService } from '../../services/revision/revision.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: [
  ]
}) 
export class GraficasComponent implements OnInit {

  public timeFormat: string = 'DD/MM/YYYY';

  //Gráfica de costes -- Default data
  public lineChartData: ChartDataSets[] = [{}];
  public lineChartLabels: Date[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public lineChartOptions: ChartOptions = {};
  public lineChartColors: Color[] = [
    
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'rgba(255,0,0,0.8)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(0, 0, 255, 0.3)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'rgba(0,0,255,0.8)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  // ID del paciente revisado
  public idPaciente: number;
  // Control para detectar cambio entre gráficas
  public checked: boolean = false;
  // Ojos del paciente tratados (IZQ, DER o ambos)
  public ojos: String[] = [];
  // Variable para la etiqueta Coste Acumulado de la gráfica Costes
  public coste_acum = 0;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(public _graficasService: GraficaService,
              public _revisionService: RevisionService,
              public activatedRoute: ActivatedRoute
              ) { 
                activatedRoute.params.subscribe(params => {      
                  // Almacenar ID del paciente
                  this.idPaciente = params['idPaciente'];
                });

              }

  ngOnInit() {

    // Mostramos gráfica por defecto
    this.mostrarGraficaEvolucion();

  }

  mostrarGraficaEvolucion(){

    // Cambiamos las medidas corresp. para el eje Y
    this.lineChartOptions = {
      tooltips: {
        callbacks: {
            // Etiqueta mostrada al hacer hover sobre un pico de la gráfica
            label: function(tooltipItem, data: any) {

                var label = []
                
                label.push('Agudeza visual: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].y);

                let medicamentos = [];
                for (var medicamento in data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].medicamentos) {
                  medicamentos.push(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].medicamentos[medicamento].nombre);
                }

                if(medicamentos.length > 0) {
                  label.push('Medicamentos: ' + medicamentos);
                }

                return label;
            }
        }
      },
      title: {
        display: true,
        position: 'top',
        fontSize: 25,
        fontFamily: 'Montserrat',
        text: 'Progreso del paciente'
      },
      responsive: true,
      elements: {
        point: { radius: 6, borderColor: 'rgba(0, 0, 0, 0.1)' },
        line: { tension: 0}
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{
          distribution: 'linear',
          type:"time",
          time: {
            unit: 'month',
            displayFormats: {
              quarter: 'MMM YYYY',
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Tiempo',
            fontSize: 20,
            fontFamily: 'Montserrat',
          },
        }],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Agudeza visual',
              fontSize: 20,
              fontFamily: 'Montserrat',
            },
            id: 'y-axis-0',
            position: 'left',
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1
            }        
          },
        ]
      }
    };

    this._graficasService.getDatosOjos(this.idPaciente)
      .subscribe((ojos: any) => {

          //console.log(ojos);
          this.lineChartData = [];
          this.lineChartLabels = [];
          
          //Para cada ojo generamos una línea (serie) en la gráfica
          ojos.forEach(ojo => { 

            // Información de cada objeto Ojo
            let ojo_revision = ojo.ojo_revision;
            let mediciones = ojo.Medicions;
            let escaneres = ojo.Escaner_Retinas;

            // Variable auxilizar para almacenar las tuplas (fecha-agudeza)
            let datos = [];  
            for(var medicion in mediciones){

              //console.log(medicion)

              var fecha = this.transformarFecha(mediciones[medicion].fecha_creacion);
              var agudeza = mediciones[medicion].agudeza_visual;
              var medicamentos = mediciones[medicion].Revision.Medicamentos;
              // Añadimos la fecha y la agudeza visual de la revisión al array auxiliar
              datos.push({x: fecha, y: agudeza, medicamentos: medicamentos} );
              
            }

            // Añadimos al dataset de la gráfica la información obtenida
            this.lineChartData.push({ data: datos, label: ojo_revision });

            // Añadimos información para la tabla 
            this.ojos.push(ojo_revision);
          });

    })      
  }

  mostrarGraficaCostes() {
    
    // Cambiamos las medidas del eje Y
    this.lineChartOptions = {
      tooltips: {
        callbacks: {
           // Etiqueta mostrada al hacer hover sobre un pico de la gráfica
            label: function(tooltipItem, data: any) {
                var label = []
                
                label.push('Coste total: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].y + ' €');

                let medicamentos = [];
                for (var medicamento in data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].medicamentos) {
                  medicamentos.push(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].medicamentos[medicamento].nombre + ' (' +
                  data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].medicamentos[medicamento].precio + '€)' );
                }

                if(medicamentos.length > 0) {
                  label.push('Desglose medicamentos: ' + medicamentos);
                }

                return label;
            }
        }
      },
      title: {
        display: true,
        position: 'top',
        fontSize: 25,
        fontFamily: 'Montserrat',
        text: 'Costes del tratamiento'
      },
      responsive: true,
      elements: {
        point: { radius: 6, borderColor: 'rgba(0, 0, 0, 0.1)' },
        line: { tension: 0}
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{ 
          distribution: 'linear',
          type:"time",
          time: {
            unit: 'month',
            displayFormats: {
              quarter: 'MMM YYYY',
            }
          },
          scaleLabel: {
            display: true,
            fontSize: 20,
            fontFamily: 'Montserrat',
            labelString: 'Tiempo',
          },
        }],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Coste (€)',
              fontSize: 20,
              fontFamily: 'Montserrat',
            },
            id: 'y-axis-0',
            position: 'left',     
          },
        ]
      }
    };

    return this._graficasService.getRevisionesyMedicamentosFromPaciente(this.idPaciente)
          .subscribe((revisiones: any[]) => {

            this.lineChartData = [];
            this.lineChartLabels = []; 

            let medicamentos = [];

            // Array auxiliar
            let datosIZQUIERDO = [];
            let datosDERECHO = [];
            revisiones.forEach(revision => {
      
                //console.log(revision)
                if( revision.Ojos[0].ojo_revision == 'IZQUIERDO') {

                  datosIZQUIERDO.push({ x: this.transformarFecha(revision.fecha_revision), y: revision.coste_total, medicamentos: revision.Medicamentos})
                  // Coste acumulado
                  this.coste_acum = revision.coste_acum;
                
                }else {
                  
                  datosDERECHO.push({ x: this.transformarFecha(revision.fecha_revision), y: revision.coste_total, medicamentos: revision.Medicamentos})
                  // Coste acumulado
                  this.coste_acum = revision.coste_acum;
                }
            })
            
            //Añadimos los datos(costes) de las revisiones
            this.lineChartData.push({data: datosIZQUIERDO, label: 'Tratamiento - Ojo IZQUIERDO' });
            this.lineChartData.push({data: datosDERECHO, label: 'Tratamiento - Ojo DERECHO' });

          })

  }

  cambiarGrafica() {
 
    // Borramos los datos de la gráfica anterior
    this.lineChartLabels = [];
    this.lineChartData = [];
    this.lineChartOptions = {};  
 
    if(this.checked) {
        this.mostrarGraficaCostes();
    }else {
        this.mostrarGraficaEvolucion();
    }
  }

  // Transforma la fecha al formato 'YYYY/MM/DD'
  transformarFecha(fecha: Date) {
    return fecha.toString().substring(0,10);
  }

  // Events 
  public chartClicked({ event, active }: { event: MouseEvent, active: any[] }): void {
    //console.log(active[0]._chart.chart.config.data.datasets[0].data[active[0]._index]);
  }

  // public hideOne() {
  //   const isHidden = this.chart.isDatasetHidden(1);
  //   this.chart.hideDataset(1, !isHidden);
  // }

}