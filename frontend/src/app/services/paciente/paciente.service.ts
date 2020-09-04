import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  token: string;
  paciente: Paciente;

    constructor(
        public http: HttpClient,
        public router: Router
    ) { }

    // Busca sobre todos los pacientes registrados
    buscarPacientesRegistrados(termino: string){

      let url = environment.apiUrl + '/' + 'pacientes/busqueda' + '/' + termino;
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    // Busca sobre los pacientes asociados a un médico
    buscarPacientes(idMedico: number, termino: string){

      let url = environment.apiUrl + '/' + 'pacientes' + '/' + idMedico + '/busqueda' + '/' + termino;
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    cargarPacientes(){

      let url = environment.apiUrl + '/' + 'pacientes';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    cargarPacientesDeBaja(){

      let url = environment.apiUrl + '/' + 'pacientes/baja';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    cargarPaciente(id: Int16Array){

      let url = environment.apiUrl + '/' + 'pacientes' + '/' + id;
      url += '?token=' + localStorage.getItem('token');
      
      return this.http.get(url);
    }

    crearPaciente(paciente: Paciente){

      let url = environment.apiUrl + '/' + 'pacientes';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.post(url, paciente)
          .pipe(
              map( (resp: any) => {
  
                  Swal.fire('Paciente creado', paciente.nombre, 'success').then((result) => {
                    if(result.value == true){
                        //Actualizamos la lista
                        window.location.reload();
                    }
                  });

                  return true;
                  
              }),
              catchError((err, caught) => {
  
                  Swal.fire('No se ha podido crear el paciente', paciente.nombre, 'error');
                  return empty();
              })
          )
    }

    actualizarPaciente(paciente: Paciente){
      let url = environment.apiUrl + '/' + 'pacientes/' + paciente.id;
      url += '?token=' + localStorage.getItem('token');

      return this.http.put( url, paciente )
              .pipe(
                  map( (resp: any) => {

                      Swal.fire('Paciente actualizado', paciente.nombre, 'success');

                      return true;
                      
                  }),
                  catchError((err, caught) => {
                      Swal.fire('No se ha podido actualizar el paciente, modifica alguno de los campos', paciente.nombre, 'error');
                      return empty();
                  })
              );          
    }

    inhabilitarPaciente(paciente: Paciente) {

      let url = environment.apiUrl + '/' + 'pacientes/' + paciente.id;
      url += '?token=' + localStorage.getItem('token');

      paciente.deBaja = true;

      return this.http.put( url, paciente )
            .pipe(
                map( (resp: any) => {
                        
                  // Volvemos al listado de pacientes
                  this.router.navigate(['/pacientes']);

                }),
                catchError((err, caught) => {
                    Swal.fire('No se ha podido dar de baja al paciente', paciente.nombre, 'error');
                    return empty();
                })
            );  


    }

    habilitarPaciente(paciente: Paciente) {

      let url = environment.apiUrl + '/' + 'pacientes/' + paciente.id;
      url += '?token=' + localStorage.getItem('token');

      paciente.deBaja = false;

      return this.http.put( url, paciente )
            .pipe(
                map( (resp: any) => {
                    
                      //Actualizamos la lista
                      window.location.reload(); 
                                        
                }),
                catchError((err, caught) => {
                    Swal.fire('No se ha podido dar de alta al paciente', paciente.nombre, 'error');
                    return empty();
                })
            );  


    }
}

