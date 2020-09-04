import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatoAntropometricoService } from '../../services/service.index';
import { DatoAntropometrico } from 'src/app/models/dato-antropometrico.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-antropometricos',
  templateUrl: './datos-antropometricos.component.html',
  styles: [
  ]
})
export class DatosAntropometricosComponent implements OnInit {

  //Lista de datos del paciente
  datos: DatoAntropometrico[];
  //DatoAntropometrico seleccionado, por defecto nulo
  dato: DatoAntropometrico = new DatoAntropometrico(null,new Date(),'',null,null,null,null);
  //ID del paciente 
  idPaciente: number;
  //Formulario de creación datos
  formulario: FormGroup;
  //Controles para activar/desactivar los formularios
  control: boolean = false;
  control2: boolean = false;
  numeroCol: number;

  constructor(public _datosAntropoService: DatoAntropometricoService,
              public activatedRoute: ActivatedRoute,
    ) {
        activatedRoute.params.subscribe(params => {  
          // Cargar datos del paciente seleccionado
          this.cargarDatosDelPaciente(params['id']);
          // Guardamos su ID
          this.idPaciente = params['id'];
        });

        this.formulario = new FormGroup({
          obesidad: new FormControl(null, Validators.required),
          peso: new FormControl(null, Validators.required),
          altura: new FormControl(null, Validators.required),
          perim_abdominal: new FormControl(null, Validators.required),
          imc: new FormControl(null, Validators.required)
        });
  }

  ngOnInit(): void { }

  cargarDato(id: Int16Array, numeroCol: number){

    // Id del dato antropométrico de la tabla seleccionado
    this.dato.id = id;
    // Identificador de la fila de la tabla seleccionada
    this.numeroCol = numeroCol;

    this._datosAntropoService.cargarDatoAntropo(id)
      .subscribe( (dato: DatoAntropometrico) => {
          this.dato = dato;
      });
  }

  cargarDatosDelPaciente(id: Int16Array){

    this._datosAntropoService.cargarDatosAntropoDePaciente(id)
        .subscribe( (datos: DatoAntropometrico[]) => {
            this.datos = datos;
        });
        
  }

  anadirDato(dato: DatoAntropometrico){

    dato.fecha_creacion = new Date(Date.now());
    this._datosAntropoService.añadirDatoAntropo(this.idPaciente, dato)
      .subscribe();
  }

  editarDato(dato: DatoAntropometrico){

    dato.id = this.dato.id;

    this._datosAntropoService.editarDatoAntropo(this.idPaciente, dato)
      .subscribe();
  }

  borrarDato(dato: DatoAntropometrico){
    
    this._datosAntropoService.borrarDatoAntropo(this.idPaciente, dato)
        .subscribe();
  }

  activarFormulario(){

    if(this.control === true){
      this.control = false;
      this.control2 = false;
    } 
    else{ 
      this.control = true;
      this.control2 = false;
    } 
  }

  activarFormulario2(){

    if(this.control2 === true){
      this.control = false;
    } 
    else{ 
      this.control2 = true;
      this.control = false;
    } 
  }
}
