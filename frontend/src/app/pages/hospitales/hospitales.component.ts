import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  rol: string;
  hospitales: any = [];
  formulario: FormGroup;
  control: boolean = false;

  constructor(public _hospitalService: HospitalService) { }

  ngOnInit( ) {
    this.cargarHospitales();

    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      ciudad: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required)
    });

    // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
    this.rol = localStorage.getItem('rol');
  }

  cargarHospitales(){
    
    this._hospitalService.cargarHospitales()
          
          .subscribe(resp => {
            this.hospitales = resp;
          });
  }

  buscarHospitales(termino: string){

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospitales(termino)
        .subscribe( (hospitales: Hospital[] ) => {
          this.hospitales = hospitales;
        });
  }

  crearHospital( hospital: Hospital ) {

    this._hospitalService.crearHospital( hospital )
                .subscribe(resp =>{
                  console.log(resp);
                });
  }

  activarFormulario(){
    if(this.control === true){
      this.control = false;
    } 
    else{ this.control = true;} 
  }

  
}
