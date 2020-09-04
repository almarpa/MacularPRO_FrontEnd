import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Enfermedad } from '../../models/enfermedad.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  constructor(public http: HttpClient,
              public router: Router) { 

              }

  cargarEnfermedad(id){

    let url = environment.apiUrl + '/' + 'enfermedades' + '/' + id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  cargarEnfermedadesDePaciente(id){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + id + '/enfermedades';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }
    
  añadirEnfermedad(pacienteId, enfermedad: Enfermedad){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/enfermedades';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, enfermedad)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Enfermedad añadida', enfermedad.nombre, 'success').then((result) => {
                  if(result.value == true){
                      //Actualizamos la lista
                      window.location.reload();
                  }
                });
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido añadir la enfermedad', enfermedad.nombre, 'error');
                return empty();
            })
        )
  }

  editarEnfermedad(pacienteId: number, enfermedad: Enfermedad){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/enfermedades' + '/' + enfermedad.id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.put( url, enfermedad )
            .pipe(
                map( (resp: any) => {

                    Swal.fire('Enfermedad actualizado', enfermedad.nombre, 'success').then((result) => {
                      if(result.value == true){
                          //Actualizamos la lista
                          window.location.reload();
                      }
                    });
                    return true;
                    
                }),
                catchError((err, caught) => {
                    Swal.fire('No se ha podido actualizar la enfermedad', enfermedad.nombre, 'error');
                    return empty();
                })
            )
  }

  borrarEnfermedad(pacienteId: number, enfermedad: Enfermedad){
    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/enfermedades' + '/' + enfermedad.id;
    url += '?token=' + localStorage.getItem('token');  

    return this.http.delete(url)
        .pipe(
          map(resp => {
            Swal.fire('La enfermedad ha sido eliminada', enfermedad.nombre, 'success').then((result) => {
              if(result.value == true){
                  //Actualizamos la lista
                  window.location.reload();
              }
            });
            return true;
          })
        )
  }
}
