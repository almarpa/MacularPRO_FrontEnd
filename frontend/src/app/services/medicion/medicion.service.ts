import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../../models/medicion.model';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(public http: HttpClient) { }


  public getMedicionesByRevisionOjo(pacienteId: number, ojoId: number){

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/ojos/' + ojoId + '/mediciones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);  
  }


  crearMedicion(pacienteId: number, revisionId: number, ojoId: number, medicion: Medicion){

    // Asignamos a la medición la fecha en el momento en que se crea
    medicion.fecha_creacion = new Date(Date.now());

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/revisiones/' + revisionId + '/ojos/' + ojoId + '/mediciones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, medicion)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Medición creada', 'Con éxito', 'success');
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido crear la medición','', 'error');
                return empty();
            })
        )
  }

  editarMedicion(pacienteId: number, medicion: Medicion){

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/mediciones/' + medicion.id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.put(url, medicion)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Medición editada', 'Con éxito', 'success');
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido editar la medición', 'Sin éxito');
                return empty();
            })
        )
  }

  cargarMedicion(idMedicion: number){
    
    let url = environment.apiUrl + '/' + 'mediciones' + '/' + idMedicion;
    url += '?token=' + localStorage.getItem('token');
    
    return this.http.get(url);
  }

}
