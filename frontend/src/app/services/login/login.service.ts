import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {
  token: string;
  usuario: Medico;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estalogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Medico) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', usuario.nombre);
    localStorage.setItem('correo', usuario.correo);
    localStorage.setItem('rol', usuario.rol);
    //localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(correo: string, password: string, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('correo', correo);
    } else {
      localStorage.removeItem('correo');
    }

    let url = environment.apiUrl + '/' + 'login';

    return this.http.post(url, { correo, password }).pipe(
      map((resp: any) => {

        if(resp.medico.deBaja == true){

          Swal.fire(
            'No se ha podido iniciar sesión',
            'El usuario ha sido dado inhabilitado',
            'error'
          );

        }else{

          this.guardarStorage(resp.medico.id, resp.token, resp.medico);
          return true;
        }

        return false;
        
      }),
      catchError((err, caught) => {
        Swal.fire(
          'No se ha podido iniciar sesión',
          'Nombre de usuario o contraseña incorrecto',
          'error'
        );
        return empty();
      })
    );
  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Medico) {
    let url =
      environment.apiUrl + '/' + 'medicos/' + localStorage.getItem('id');
    url += '?token=' + this.token;

    console.log(usuario);

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(localStorage.getItem('id'), this.token, usuario);

        Swal.fire('Usuario actualizado', usuario.nombre, 'success');

        return true;
      }),
      catchError((err, caught) => {
        Swal.fire(
          'No se ha podido actualizar el usuario, modifica alguno de sus valores',
          usuario.nombre,
          'error'
        );
        return empty();
      })
    );
  }
}
