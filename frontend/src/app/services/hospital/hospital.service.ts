import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(        
    public http: HttpClient,
    public router: Router
    ) { }

  cargarHospitales(){

    let url = environment.apiUrl + '/' + 'hospitales';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  cargarHospital(id: Int16Array){

    let url = environment.apiUrl + '/' + 'hospitales' + '/' +  id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  buscarHospitales(termino: string){

    let url = environment.apiUrl + '/' + 'hospitales' + '/busqueda' + '/' + termino;
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  crearHospital(hospital: Hospital){

    let url = environment.apiUrl + '/' + 'hospitales';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, hospital)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Hospital creado', hospital.nombre, 'success').then((result) => {
                  if(result.value == true){
                      //Actualizamos la lista
                      window.location.reload();
                  }
                });
                return true;
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido crear el hospital', hospital.nombre, 'error');
                return empty();
            })
        )
  }

  cargarMedicosDeHospital(id: Int16Array){
    let url = environment.apiUrl + '/' + 'hospitales' + '/' + id + '/medicos';
    url += '?token=' + localStorage.getItem('token');  

    return this.http.get(url);
  }
}
