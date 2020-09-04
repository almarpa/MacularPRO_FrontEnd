import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OjoService {

  constructor(public http: HttpClient) { }

  cargarOjosPorRevision(pacienteId: number, revisionId: number){
    
    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/revisiones/' + revisionId + '/ojos';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);    
  }

  cargarOjosPorPaciente(pacienteId: number){
    
    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/revisiones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);    
  }

}
