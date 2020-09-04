import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Revision } from '../../models/revision.model';
import { Escaner } from '../../models/escaner.model';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EscanerService {

  constructor(public http: HttpClient) { }


  public getEscaneresByRevisionOjo(pacienteId: number, ojoId: number){

    let url = environment.apiUrl + '/'  + 'pacientes/' + pacienteId + '/ojos/' + ojoId + '/escaneres';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);  
  }


  crearEscaner(pacienteId: number, ojoId: number, escaner: Escaner){

    // Asignamos al escáner la fecha en el momento en que se crea
    escaner.fecha_creacion = new Date(Date.now());

    let url = environment.apiUrl + '/'  + 'pacientes/' + pacienteId + '/ojos/' + ojoId + '/escaneres';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, escaner)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Escáner de retina creado','Con éxito', 'success');
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido crear el escáner de retina','Sin éxito', 'error');
                return empty();
            })
        )
  }

  editarEscaner(pacienteId: number, escaner: Escaner){

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/escaneres/' + escaner.id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.put(url, escaner)
        .pipe(
            map( (resp: any) => {

                Swal.fire('Escáner de retina editado', 'Con éxito', 'success');
                return true;
                
            }),
            catchError((err, caught) => {

                Swal.fire('No se ha podido editar el escáner de retina', 'Sin éxito', 'error');
                return empty();
            })
        )
  }

  cargarEscaner(idEscaner: number){
    
    let url = environment.apiUrl + '/'  + 'escaneres' + '/' + idEscaner;
    url += '?token=' + localStorage.getItem('token');
    
    return this.http.get(url);
  }

}
