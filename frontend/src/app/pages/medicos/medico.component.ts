import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  rol: string;
  correoLogin: string;
  medico: Medico = new Medico(null,'','','','','',null,'',null,'',null,null);

  constructor(public _medicoService: MedicoService,
              public activatedRoute: ActivatedRoute,
    ) {
        activatedRoute.params.subscribe(params => {      
          // Cargar información del médico seleccionado
          this.cargarMedico(params['id']);
        });

        // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
        this.rol = localStorage.getItem('rol');
        // Obtenemos el correo del usuario logueado 
        this.correoLogin = localStorage.getItem('correo');
    }
  ngOnInit(): void {
  }

  cargarMedico(id: Int16Array){

    this._medicoService.cargarMedico(id)
        .subscribe( (medico: Medico) => {
            this.medico = medico;
        });
  }

  darMedicoDeBaja( medico: Medico){
    
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

        this._medicoService.inhabilitarMedico(medico).subscribe();

        Swal.fire('El médico ha sido dado de baja', medico.apellidos  + ', ' + medico.nombre, 'success');
      }
    });
  }

}