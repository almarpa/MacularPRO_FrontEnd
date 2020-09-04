import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: [
  ]
})
export class PacienteComponent implements OnInit {

  rol: string;
  id: number;
  paciente: Paciente = new Paciente (this.id,'','', null, null, '', '',false);
  control: boolean = false;

  constructor(public _pacienteService: PacienteService,
              public activatedRoute: ActivatedRoute
            ) {
      activatedRoute.params.subscribe(params => {      
        // Cargar información del médico seleccionado
        this.cargarPaciente(params['id']);
        this.id = params['id'];
      });

      // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
      this.rol = localStorage.getItem('rol');
  }

  ngOnInit(): void {
  }

  cargarPaciente(id: Int16Array){

    this._pacienteService.cargarPaciente(id)
    .subscribe( (paciente: Paciente) => {
      this.paciente = paciente;
    });
    
  }

  actualizarPaciente( paciente: Paciente ) {
    paciente.id =  this.paciente.id;
    this._pacienteService.actualizarPaciente(paciente)
        .subscribe();
    
    window.location.reload();

  }

  darPacienteDeBaja( paciente: Paciente){
    
    Swal.fire({
      title: '¿Estás seguro de darlo de baja?',
      text: 'Podrás darlo de alta más adelante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, darlo de baja',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this._pacienteService.inhabilitarPaciente(paciente).subscribe();

        Swal.fire('El paciente ha sido dado de baja', paciente.apellidos + ', ' + paciente.nombre , 'success');
      }
    });
  }

  activarFormulario(){
    if(this.control === true){
      this.control = false;
    } 
    else{ this.control = true;} 
  }

}