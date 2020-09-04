import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, MedicoService, HospitalService, EnfermedadService, DatoAntropometricoService, 
         AntecedenteService, GraficaService, OjoService, MedicionService, EscanerService, RevisionService
       } from './service.index';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    SharedService,
    MedicoService,
    HospitalService,
    LoginService,
    EnfermedadService,
    DatoAntropometricoService,
    AntecedenteService,
    RevisionService,
    EscanerService,
    MedicionService,
    OjoService,
    GraficaService
  ]
})
export class ServiceModule { }
