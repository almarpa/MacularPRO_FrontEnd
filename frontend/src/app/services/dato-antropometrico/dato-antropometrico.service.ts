import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
import { DatoAntropometrico } from '../../models/dato-antropometrico.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatoAntropometricoService {

  constructor(public http: HttpClient,
              public router: Router) { 

              }

  cargarDatoAntropo(id){

    let url = environment.apiUrl + '/' + 'datos-antropometricos' + '/' + id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  cargarDatosAntropoDePaciente(id){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + id + '/datos-antropometricos';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }
    
  añadirDatoAntropo(pacienteId, dato: DatoAntropometrico){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/datos-antropometricos';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, dato)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Dato antropométrico añadido', '', 'success').then((result) => {
                  if(result.value == true){
                      //Actualizamos la lista
                      window.location.reload();
                  }
                });
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido añadir el dato antropométrico', '', 'error');
                return empty();
            })
        )
  }

  editarDatoAntropo(pacienteId: number, dato: DatoAntropometrico){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/datos-antropometricos' + '/' + dato.id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.put( url, dato )
            .pipe(
                map( (resp: any) => {

                    Swal.fire('Dato antropométrico actualizado', '', 'success').then((result) => {
                      if(result.value == true){
                          //Actualizamos la lista
                          window.location.reload();
                      }
                    });

                    return true;
                    
                }),
                catchError((err, caught) => {
                    Swal.fire('No se ha podido actualizar el dato antropométrico', '', 'error');
                    return empty();
                })
            )
                
  }

  borrarDatoAntropo(pacienteId: number, dato: DatoAntropometrico){
    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/datos-antropometricos' + '/' + dato.id;
    url += '?token=' + localStorage.getItem('token');  

    return this.http.delete(url)
        .pipe(
          map(resp => {
            Swal.fire('Dato antropométrico eliminado', '', 'success').then((result) => {
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
