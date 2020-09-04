import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente/paciente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {

  rol: string;
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  formulario: FormGroup;
  control: boolean = false;
  controlList: boolean = false;
  id_medico: any = localStorage.getItem('id');

  constructor(public _pacienteService: PacienteService,
              public _medicoService: MedicoService) { }

  ngOnInit( ) {

    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      sip: new FormControl(null, Validators.required),
      fecha_nac: new FormControl(null, Validators.required),
      sexo: new FormControl(null, Validators.required),
      clase_econom: new FormControl(null, Validators.required),
      medico: new FormControl(null, Validators.required)
    });

    // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
    this.rol = localStorage.getItem('rol');

    this.cargarPacientes(this.id_medico);
    this.cargarMedicos();
  }

  // Obtiene los pacientes asociados de un médico
  cargarPacientes(id_medico: Int16Array){

    // En caso de que sea un colaborador, se obtiene todos los pacientes
    if( this.rol == "COLABORADOR") {

      this._pacienteService.cargarPacientes()
        .subscribe((paciente: Paciente[]) => {
            this.pacientes = paciente;
      });
        
    }else {

      this._medicoService.cargarPacientesByMedicos(id_medico)  
        .subscribe((paciente: Paciente[]) => {
            this.pacientes = paciente;
      });  
    }
  }

  buscarPacientes(termino: string){

    // Si la busqueda está limpia, no hay filtro de búsqueda
    if ( termino.length <= 0 ) {
      this.cargarPacientes(this.id_medico);
      return;
    }

    // Si es un colaborador la búsqueda se realiza sobre todos los pacientes
    if( this.rol == "COLABORADOR") {

      this._pacienteService.buscarPacientesRegistrados(termino)
        .subscribe( (pacientes: Paciente[] ) => {
              this.pacientes = pacientes;
        });

    // Si es un médico la búsqueda se realiza sobre sus pacientes asociados
    }else {
 
      this._pacienteService.buscarPacientes(this.id_medico,termino)
        .subscribe( (pacientes: Paciente[] ) => {
              this.pacientes = pacientes;
        });
    }
  }

  cargarMedicos(){

    // Únicamente obtiene los médicos, no los colaboradores
    this._medicoService.cargarSoloMedicos()
        .subscribe( (medicos: Medico[]) => {
              this.medicos = medicos;
        });
  }

  crearPaciente( paciente: Paciente ) {

    this._pacienteService.crearPaciente( paciente )
          .subscribe();
  }

  activarFormulario(){

    if(this.control === true){
      this.control = false;
    } 
    else{ this.control = true;} 
  }

  activarFormulario2(){

    if(this.controlList === true){
      this.controlList = false;
    } 
    else{ this.controlList = true;} 
  }
}
