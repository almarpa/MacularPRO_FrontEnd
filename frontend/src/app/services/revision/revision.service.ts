import { Injectable } from '@angular/core';
import { Revision } from '../../models/revision.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  constructor(public http: HttpClient,
              public router: Router) 
              { 
  
              }

  cargarRevisiones(idPaciente: number){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + idPaciente + '/revisiones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

  cargarRevision(idRevision: number){

    let url = environment.apiUrl + '/' + 'revisiones' + '/' + idRevision;
    url += '?token=' + localStorage.getItem('token');
    
    return this.http.get(url);
  }

  crearRevision(pacienteId: number, revision: Revision){
    
    // Asignamos a la revisión la fecha en el momento en que se crea
    revision.fecha_revision = new Date(Date.now());
    
    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/revisiones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.post(url, revision)
        .pipe(
            map( (resp: any) => {
              
                let fecha: string = revision.fecha_revision.getFullYear()+'/'+revision.fecha_revision.getMonth()+'/'+revision.fecha_revision.getDay();

                Swal.fire('Revisión creada', fecha, 'success').then((result) => {
                  if(result.value == true){
                      //Actualizamos la lista
                      window.location.reload();
                  }
                });
                return true;
                
                
            }),
            catchError((err, caught) => {
              
                let fecha: string = revision.fecha_revision.getFullYear()+'/'+revision.fecha_revision.getMonth()+'/'+revision.fecha_revision.getDay();

                Swal.fire('No se ha podido crear la revisión', fecha, 'error');
                return empty();
            })
        )
  }

  editarRevision(pacienteId: number, revision: Revision){

    let url = environment.apiUrl + '/' + 'pacientes' + '/' + pacienteId + '/revisiones' + '/' + revision.id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.put( url, revision )
            .pipe(
                map( (resp: any) => {

                    Swal.fire('Revisión editada con éxito', '', 'success').then((result) => {
                      if(result.value == true){
                          //Actualizamos la lista
                          window.location.reload();
                      }
                    });
                    return true;
                    
                }),
                catchError((err, caught) => {
                    Swal.fire('No se ha podido editar la revisión', 'error');
                    return empty();
                })
            )
  }
}
