import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnfermedadService } from '../../services/service.index';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styles: [
  ]
})
export class EnfermedadesComponent implements OnInit {

  //Lista de enfermedades del paciente
  enfermedades: Enfermedad[];
  //enfermedad seleccionado, por defecto nulo
  enfermedad: Enfermedad = new Enfermedad(null,'','',new Date());
  //ID del paciente 
  idPaciente: number;
  //Formulario de creación enfermedades
  formulario: FormGroup;
  //Controles para activar/desactivar los formularios
  control: boolean = false;
  control2: boolean = false;
  numeroCol: number;
  
  constructor(public _enfermedadService: EnfermedadService,
              public activatedRoute: ActivatedRoute,
    ) {
        activatedRoute.params.subscribe(params => {  
          // Cargar enfermedades del paciente seleccionado
          this.cargarEnfermedadesDelPaciente(params['id']);
          // Guardamos su ID
          this.idPaciente = params['id'];
        });

        this.formulario = new FormGroup({
          nombre: new FormControl(null, Validators.required),
          descripcion: new FormControl(null, Validators.required),
          fecha: new FormControl(null, Validators.required),
        });
  }

  ngOnInit(): void { }

  cargarEnfermedad(id: Int16Array, numeroCol: number) {

    // Id del antecedente de la tabla seleccionado
    this.enfermedad.id = id;
    // Identificador de la fila de la tabla seleccionada
    this.numeroCol = numeroCol;
    

    this._enfermedadService.cargarEnfermedad(id)
      .subscribe( (enfermedad: Enfermedad) => {
          this.enfermedad = enfermedad;
      });
  }

  cargarEnfermedadesDelPaciente(id: Int16Array){

    this._enfermedadService.cargarEnfermedadesDePaciente(id)
        .subscribe( (enfermedades: Enfermedad[]) => {
            this.enfermedades = enfermedades;
        });
        
  }

  anadirEnfermedad(enfermedad: Enfermedad){

    this._enfermedadService.añadirEnfermedad(this.idPaciente, enfermedad)
      .subscribe();
  }

  editarEnfermedad(enfermedad: Enfermedad){

    enfermedad.id = this.enfermedad.id;

    this._enfermedadService.editarEnfermedad(this.idPaciente, enfermedad)
      .subscribe();
  }

  borrarEnfermedad(enfermedad: Enfermedad){
    
    this._enfermedadService.borrarEnfermedad(this.idPaciente, enfermedad)
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
