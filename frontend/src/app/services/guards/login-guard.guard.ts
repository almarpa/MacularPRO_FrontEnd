import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( 
    public _loginService: LoginService,
    public router: Router
  ){

  }

  canActivate(){

    if( this._loginService.estalogueado() ){
      console.log('Paso por el guard');
      return true;
    }else{
      console.log( 'Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
