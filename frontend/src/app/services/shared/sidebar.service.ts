import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Menú Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/dashboard' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Médicos', url: '/medicos' },
        { titulo: 'Pacientes', url: '/pacientes' }
      ]
    }
  ]

  constructor() { }
}
