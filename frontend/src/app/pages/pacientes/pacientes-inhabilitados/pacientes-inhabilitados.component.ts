import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../services/paciente/paciente.service';
import { Paciente } from '../../../models/paciente.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-inhabilitados',
  templateUrl: './pacientes-inhabilitados.component.html',
  styles: [
  ]
})
export class PacientesInhabilitadosComponent implements OnInit {

  pacientes: Paciente[] = [];

  constructor(public _pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.cargarPacientesInhabilitados();
  }

  cargarPacientesInhabilitados(){
    
    this._pacienteService.cargarPacientesDeBaja()
          .subscribe((paciente: Paciente[]) => {
            this.pacientes = paciente;
          });

  }

  habilitarPaciente( paciente: Paciente) {

    Swal.fire({
      title: '¿Estás seguro de darlo de alta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, darlo de alta',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this._pacienteService.habilitarPaciente(paciente).subscribe();

        Swal.fire('El paciente ha sido dado de alta', paciente.apellidos + ', ' + paciente.nombre , 'success');
      }
    });
          
  }

}
