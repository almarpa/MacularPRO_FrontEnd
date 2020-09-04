import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login/login.service';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  correo: string;
  recuerdame: boolean = false;

  constructor( 
    public router: Router,
    public _loginService: LoginService
  ) { }

  ngOnInit() {
    init_plugins();

    this.correo = localStorage.getItem('correo') || '';
    if(this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ){

    if(forma.invalid){
      return;
    }
    
    this._loginService.login( forma.value.correo, forma.value.password, forma.value.recuerdame )
          .subscribe( correcto => this.router.navigate(['/dashboard']));
  }
}