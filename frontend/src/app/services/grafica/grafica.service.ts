import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {

  constructor(public http: HttpClient) { }

  public getDatosOjos(pacienteId: number) {
    
    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/ojos';
    url += '?token=' + localStorage.getItem('token'); 
    
    return this.http.get(url);
  }

  public getMedicionesFromOjo(pacienteId: number, ojoId: number){

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/ojos/' + ojoId + '/mediciones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);  
  }

  public getEscaneresFromOjo(pacienteId: number, ojoId: number){

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/ojos/' + ojoId + '/escaneres';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);   
  }

  public getRevisionesyMedicamentosFromPaciente(pacienteId: number){

    let url = environment.apiUrl + '/' + 'pacientes/' + pacienteId + '/revisiones';
    url += '?token=' + localStorage.getItem('token');

    return this.http.get(url);
  }

}
