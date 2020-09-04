import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { LoginService } from '../../services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})

export class ProfileComponent implements OnInit {

  usuario: Medico;

  constructor(public _usuarioService: LoginService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Medico ) {
    
    this._usuarioService.actualizarUsuario( usuario )
                .subscribe();
  }

}
