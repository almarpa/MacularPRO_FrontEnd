import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Medico } from '../../models/medico.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token: string;
  medico: Medico;

    constructor(
        public http: HttpClient,
        public router: Router
    ) { }

    // Obtiene un médico/colaborador
    cargarMedico(id: Int16Array){

      let url = environment.apiUrl + '/' + 'medicos' + '/' + id;
      url += '?token=' + localStorage.getItem('token');
      
      return this.http.get(url);
    }

    // Obtiene médicos y colaboradores
    cargarMedicos(){

      let url = environment.apiUrl + '/' + 'medicos';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    // Obtiene únicamente los médicos (rol: ADMIN)
    cargarSoloMedicos(){

      let url = environment.apiUrl + '/' + 'medicos/only';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    // Obtiene todos los médicos y colaboradores de baja
    cargarMedicosDeBaja(){

      let url = environment.apiUrl + '/' + 'medicos/baja';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    // Crea un medico/colaborador (depende del rol)
    crearMedico(medico: Medico){

      let url = environment.apiUrl + '/' + 'medicos';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.post(url, medico)
          .pipe(
              map( (resp: any) => {
  
                  Swal.fire('Médico creado', medico.nombre, 'success').then((result) => {
                    if(result.value == true){
                        //Actualizamos la lista
                        window.location.reload();
                    }
                  });

                  return true;
                  
              }),
              catchError((err, caught) => {
  
                  Swal.fire('No se ha podido crear el médico', medico.nombre, 'error');
                  return empty();
              })
          )
    }

    // Modifica un médico/colaborador
    actualizarMedico(medico: Medico){
      let url = environment.apiUrl + '/' + 'medicos/' + medico.id;
      url += '?token=' + localStorage.getItem('token');

      return this.http.put( url, medico )
              .pipe(
                  map( (resp: any) => {

                      Swal.fire('Médico actualizado', medico.nombre, 'success').then((result) => {
                        if(result.value == true){

                            //Actualizamos la lista
                            window.location.reload();
                        }
                      });
                      
                      return true;
                      
                  }),
                  catchError((err, caught) => {
                      Swal.fire('No se ha podido actualizar el médico, modifica alguno de los campos', medico.nombre, 'error');
                      return empty();
                  })
              )
                  
    }

    // Obtiene los paciente de un médico
    cargarPacientesByMedicos(id: Int16Array){

      let url = environment.apiUrl + '/' + 'medicos' + '/' + id + '/pacientes';
      url += '?token=' + localStorage.getItem('token');
  
      return this.http.get(url);
    }

    // Da de baja un médico/colaborador
    inhabilitarMedico(medico: Medico) {

      let url = environment.apiUrl + '/' + 'medicos/' + medico.id;
      url += '?token=' + localStorage.getItem('token');

      medico.deBaja = true;

      return this.http.put( url, medico )
              .pipe(
                  map( (resp: any) => {

                      // Volvemos al listado de pacientes
                      this.router.navigate(['/medicos']);
                                            
                  }),
                  catchError((err, caught) => {
                      Swal.fire('No se ha podido dar de baja el médico', medico.nombre, 'error');
                      return empty();
                  })
              )
                  
    }

    // Da de alta un médico/colaborador
    habilitarMedico(medico: Medico) {

      let url = environment.apiUrl + '/' + 'medicos/' + medico.id;
      url += '?token=' + localStorage.getItem('token');

      medico.deBaja = false;

      return this.http.put( url, medico )
              .pipe(
                  map( (resp: any) => {

                      //Actualizamos la lista
                      window.location.reload();  

                  }),
                  catchError((err, caught) => {
                      Swal.fire('No se ha podido dar de alta al médico', medico.nombre, 'error');
                      return empty();
                  })
              )
                  
    }
}