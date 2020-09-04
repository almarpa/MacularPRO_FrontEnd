import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos-inhabilitados',
  templateUrl: './medicos-inhabilitados.component.html',
  styles: [
  ]
})
export class MedicosInhabilitadosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicosInhabilitados();
  }

  cargarMedicosInhabilitados(){
    
    this._medicoService.cargarMedicosDeBaja()
          .subscribe((medicos: Medico[]) => {
            this.medicos = medicos;
          });

  }

  habilitarMedico( medico: Medico) {

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

        this._medicoService.habilitarMedico(medico).subscribe();

        Swal.fire('El paciente ha sido dado de alta', medico.apellidos + ', ' + medico.nombre , 'success');
      }
    });
    
          
  }
}
