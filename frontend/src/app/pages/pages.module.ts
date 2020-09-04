import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { HospitalComponent } from './hospitales/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { EnfermedadesComponent } from './enfermedades/enfermedades.component';
import { DatosAntropometricosComponent } from './datos-antropometricos/datos-antropometricos.component';
import { RevisionesComponent } from './revisiones/revisiones.component';
import { RevisionComponent } from './revisiones/revision.component';
import { EscaneresComponent } from './escaneres/escaneres.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ChartsModule } from 'ng2-charts';
import { MedicosInhabilitadosComponent } from './medicos/medicos-inhabilitados/medicos-inhabilitados.component';
import { PacientesInhabilitadosComponent } from './pacientes/pacientes-inhabilitados/pacientes-inhabilitados.component';

@NgModule({ 
    declarations: [
        DashboardComponent,
        HospitalesComponent,
        PacientesComponent,
        ProfileComponent,
        HospitalComponent,
        MedicosComponent,
        MedicoComponent,
        PacienteComponent,
        AntecedentesComponent,
        EnfermedadesComponent,
        DatosAntropometricosComponent,
        RevisionesComponent,
        RevisionComponent,
        EscaneresComponent,
        MedicionesComponent,
        GraficasComponent,
        MedicosInhabilitadosComponent,
        PacientesInhabilitadosComponent,
    ],
    exports: [
        DashboardComponent,
        HospitalesComponent,
        PacientesComponent
    ], 
    imports: [
        PAGES_ROUTES,
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        ChartsModule
    ]
})

export class PagesModule {}