import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AntecedenteService } from '../../services/service.index';
import { Antecedente } from 'src/app/models/antecedente.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styles: [
  ]
})
export class AntecedentesComponent implements OnInit {

  //Lista de antecedentes del paciente
  antecedentes: Antecedente[];
  //Antecedente seleccionado, por defecto nulo
  antecedente: Antecedente = new Antecedente(null,'','',false);
  //ID del paciente 
  idPaciente: number;
  //Formulario de creación antecedentes
  formulario: FormGroup;
  //Controles para activar/desactivar los formularios
  control: boolean = false;
  control2: boolean = false;
  numeroCol: number;

  constructor(public _antecedenteService: AntecedenteService,
              public activatedRoute: ActivatedRoute,
    ) {
        activatedRoute.params.subscribe(params => {  
          // Cargar antecedentes del paciente seleccionado
          this.cargarAntecedentesDelPaciente(params['id']);
          // Guardamos su ID
          this.idPaciente = params['id'];
        });

        this.formulario = new FormGroup({
          nombre: new FormControl(null, Validators.required),
          descripcion: new FormControl(null, Validators.required),
          resultado: new FormControl(null, Validators.required),
        });
  }

  ngOnInit(): void { }

  cargarAntecedente(id: Int16Array, numeroCol: number){
    // Id del antecedente de la tabla seleccionado
    this.antecedente.id = id;
    // Identificador de la fila de la tabla seleccionada
    this.numeroCol = numeroCol;

    this._antecedenteService.cargarAntecedente(id)
      .subscribe( (antecedente: Antecedente) => {
          this.antecedente = antecedente;
      });
  }

  cargarAntecedentesDelPaciente(id: Int16Array){

    this._antecedenteService.cargarAntecedentesDePaciente(id)
        .subscribe( (antecedentes: Antecedente[]) => {
            this.antecedentes = antecedentes;
        });
        
  }

  anadirAntecedente(antecedente: Antecedente){

    this._antecedenteService.añadirAntecedente(this.idPaciente, antecedente)
      .subscribe();
  }

  editarAntecedente(antecedente: Antecedente){

    antecedente.id = this.antecedente.id;

    this._antecedenteService.editarAntecedente(this.idPaciente, antecedente)
      .subscribe();
  }

  borrarAntecedente(antecedente: Antecedente){
    
    this._antecedenteService.borrarAntecedente(this.idPaciente, antecedente)
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
