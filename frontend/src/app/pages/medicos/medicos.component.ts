import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  rol: string;
  medicos: Medico[];
  hospitales: Hospital[];
  hospitalSeleccionado: any;
  formulario: FormGroup;
  control: boolean = false;
  controlList: boolean = false;

  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService) { }

  ngOnInit(): void {

    this.cargarMedicos();

    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      correo: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      sexo: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      servicio_unidad: new FormControl(null, Validators.required),
      num_colegiado: new FormControl(null, Validators.required),
      centro: new FormControl(null, Validators.required),
      rol: new FormControl(null, Validators.required),
      hospitales: new FormControl(null, Validators.required)
    });

    this._hospitalService.cargarHospitales()
          .subscribe((hospitales : Hospital[]) => {
              this.hospitales = hospitales;
          })

    // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
    this.rol = localStorage.getItem('rol');
  }

  cargarMedicos(){

    this._medicoService.cargarMedicos()
          .subscribe((medicos: Medico[]) => {
            this.medicos = medicos;
          });
  }

  cargarMedicosPorHospital(){

    this._hospitalService.cargarMedicosDeHospital(this.hospitalSeleccionado.id)
        .subscribe((medicos: Medico[]) => {
          this.medicos = medicos;
        });
  }

  crearMedico( medico: any ) {

    // Comprobamos que haya seleccionado, al menos, un hospital
    if (medico.hospitales == null) {

        Swal.fire('Seleccione al menos un hospital', '', 'error');
        return;
    }

    // Comprobamos que el correo electrónico introducido no exista en la BD
    let existeCorreo = false;
    this._medicoService.cargarMedicos()
        .subscribe( (medicos: Medico[]) => {
            medicos.forEach( med => {
              if(medico.correo == med.correo) {
                  existeCorreo = true;
              }
            })

            // Si el correo no esta repetido se permite crear
            if(!existeCorreo) {
                this._medicoService.crearMedico( medico )
                  .subscribe(resp =>{
                    console.log(resp);
                  });

            }else {
                Swal.fire('El correo introducido ya existe en nuestra base de datos', 'Introduzca otro correo', 'error');
            }
            
        })
  }

  activarFormulario(){

    if(this.control === true){
      this.control = false;

    }else{ 
      this.control = true;
    } 
  }

  activarFormulario2(){
    if(this.controlList === true){
      this.controlList = false;

    }else{ 
      this.controlList = true;
    } 
  }
  
}
