import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  correo:string;
  nombre: string;

  constructor(public _loginService: LoginService) { }

  ngOnInit(): void {
    this.correo = localStorage.getItem('correo');
    this.nombre = localStorage.getItem('nombre')
  }

}
