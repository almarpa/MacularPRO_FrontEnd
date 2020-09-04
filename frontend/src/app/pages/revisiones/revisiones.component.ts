import { Component, OnInit } from '@angular/core';
import { Revision } from '../../models/revision.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RevisionService } from '../../services/revision/revision.service';
import { ActivatedRoute } from '@angular/router';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-revisiones',
  templateUrl: './revisiones.component.html',
  styles: [
  ]
})
export class RevisionesComponent implements OnInit {

  rol: string;
  //Revisiones del paciente
  revisiones: Revision[];
  //Revision seleccionada
  revision: Revision = new Revision(null, new Date(), null, null, null, null, null);
  //Id del paciente
  pacienteId: number;
  // Médico que realiza la revisión
  medico: Medico = new Medico(null,null,null,null,null,null,null,null,null,null,null,null);
  //Formulario de creación revisiones
  formulario: FormGroup;
  //Controles para activar/desactivar los formularios
  control: boolean = false;
  controlList: boolean = false;
  numeroCol: number;

  constructor(public _revisionService: RevisionService,
              public _medicoService: MedicoService,
              public activatedRoute: ActivatedRoute) 
              { 
                  activatedRoute.params.subscribe(params => {  
                  // Cargar enfermedades del paciente seleccionado
                  this.cargarRevisionesDelPaciente(params['id']);
                  // Guardamos su ID
                  this.pacienteId = params['id'];
                  

                });

                this.formulario = new FormGroup({
                  ojo: new FormControl(null, Validators.required),
                  motivo: new FormControl(null, Validators.required),
                  observ: new FormControl(null, Validators.required),
                  medicamentos: new FormControl(null, Validators.required),
                });

                // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
                this.rol = localStorage.getItem('rol');
              }

  ngOnInit(): void {
    
  }

  cargarRevisionesDelPaciente(pacienteId: number){

    this._revisionService.cargarRevisiones(pacienteId)
      .subscribe( (revisiones: Revision[]) => {
          this.revisiones = revisiones;
      });
      
  }

  crearRevision(revision: Revision){

    this._revisionService.crearRevision(this.pacienteId, revision)
      .subscribe();
  }

  activarFormulario(){

    if(this.control == true){
      this.control = false;
    } 
    else{ 
      this.control = true;
    } 
  }

  activarFormulario2(){
    if(this.controlList === true){
      this.controlList = false;
    } 
    else{ this.controlList = true;} 
  }

}
