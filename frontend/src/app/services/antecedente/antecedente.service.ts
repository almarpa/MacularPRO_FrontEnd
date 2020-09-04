import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Antecedente } from '../../models/antecedente.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteService {

  
  constructor(public http: HttpClient,
              public router: Router) { 

              }

  cargarAntecedente(id){

    let url = environment.apiUrl + '/' + 'antecedentes' + '/' + id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  cargarAntecedentesDePaciente(id){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + id + '/antecedentes';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }
    
  añadirAntecedente(pacienteId, antecedente: Antecedente){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/antecedentes';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, antecedente)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Antecedente médico añadido', antecedente.nombre, 'success').then((result) => {
                  if(result.value == true){
                      //Actualizamos la lista
                      window.location.reload();
                  }
                });
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido añadir el antecedente', antecedente.nombre, 'error');
                return empty();
            })
        )
  }

  editarAntecedente(pacienteId: number, antecedente: Antecedente){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/antecedentes' + '/' + antecedente.id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.put( url, antecedente )
            .pipe(
                map( (resp: any) => {

                    Swal.fire('Antecedente actualizado', antecedente.nombre, 'success').then((result) => {
                      if(result.value == true){
                          //Actualizamos la lista
                          window.location.reload();
                      }
                    });

                    return true;
                    
                }),
                catchError((err, caught) => {
                    Swal.fire('No se ha podido actualizar el antecedente médico', antecedente.nombre, 'error');
                    return empty();
                })
            )
                
  }

  borrarAntecedente(pacienteId: number, antecedente: Antecedente){
    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/antecedentes' + '/' + antecedente.id;
    url += '?token=' + localStorage.getItem('token');  

    return this.http.delete(url)
        .pipe(
          map(resp => {
            Swal.fire('Antecedente médico borrado', antecedente.nombre, 'success').then((result) => {
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
