import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ActivatedRoute } from '@angular/router';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: [
  ]
})
export class HospitalComponent implements OnInit {

  hospital: Hospital = new Hospital(null,'','',null,'');
  medicos: Medico[];

  constructor(
      public _hospitalService: HospitalService,
      public activatedRoute: ActivatedRoute
  ) {
      activatedRoute.params.subscribe(params => {      
        // Cargar información del hospital seleccionado
        this.cargarHospital(params['id']);
        // Carga los pacientes asociados a un hospital
        this.cargarMedicosDeHospital(params['id']);
      });
  }

  ngOnInit(): void {
  }

  cargarHospital(id: Int16Array){

    this._hospitalService.cargarHospital(id)
        .subscribe( (hospital: Hospital) => {
            this.hospital = hospital;
        });
  }

  cargarMedicosDeHospital(id: Int16Array){

    this._hospitalService.cargarMedicosDeHospital(id)
        .subscribe( (medicos: Medico[]) => {
          console.log(medicos)
            this.medicos = medicos;
        });
  }

}
