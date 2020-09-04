import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalComponent } from './hospitales/hospital.component';
import { Component } from '@angular/core';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { DatosAntropometricosComponent } from './datos-antropometricos/datos-antropometricos.component';
import { EnfermedadesComponent } from './enfermedades/enfermedades.component';
import { RevisionesComponent } from './revisiones/revisiones.component';
import { RevisionComponent } from './revisiones/revision.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { EscaneresComponent } from './escaneres/escaneres.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PacientesInhabilitadosComponent } from './pacientes/pacientes-inhabilitados/pacientes-inhabilitados.component';
import { MedicosInhabilitadosComponent } from './medicos/medicos-inhabilitados/medicos-inhabilitados.component';

const pagesRoutes: Routes = [

            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },         
            { path: 'hospitales/:id', component: HospitalComponent, data: { titulo: 'Hospital' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos' } },
            { path: 'medicos/:id', component: MedicoComponent, data: { titulo: 'Médico' } },
            { path: 'medicos-inhabilitados', component: MedicosInhabilitadosComponent, data: { titulo: 'Médicos Inhabilitados' } },
            { path: 'pacientes', component: PacientesComponent, data: { titulo: 'Pacientes' } },
            { path: 'pacientes/:id', component: PacienteComponent, data: { titulo: 'Paciente' } },
            { path: 'pacientes-inhabilitados', component: PacientesInhabilitadosComponent, data: { titulo: 'Pacientes Inhabilitados' } },
            { path: 'pacientes/:id/antecedentes', component: AntecedentesComponent, data: { titulo: 'Antecedentes Médicos'} },
            { path: 'pacientes/:id/enfermedades', component: EnfermedadesComponent, data: { titulo: 'Enfermedades'} },
            { path: 'pacientes/:id/datos-antropometricos', component: DatosAntropometricosComponent, data: { titulo: 'Datos Antropométricos'} },
            { path: 'pacientes/:id/revisiones', component: RevisionesComponent, data: { titulo: 'Revisiones'} },
            { path: 'pacientes/:idPaciente/revisiones/:idRevision', component: RevisionComponent, data: { titulo: 'Revisión'} },
            { path: 'pacientes/:idPaciente/revisiones/:idRevision/escaneres', component: EscaneresComponent, data: { titulo: 'Escáneres de retina'} },
            { path: 'pacientes/:idPaciente/revisiones/:idRevision/mediciones', component: MedicionesComponent, data: { titulo: 'Mediciones'} },
            { path: 'pacientes/:idPaciente/graficas', component: GraficasComponent, data: { titulo: 'Gráficas'} },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );