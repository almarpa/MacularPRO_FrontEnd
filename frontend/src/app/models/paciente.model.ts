import { NgModule } from '@angular/core';
export class Paciente {

    constructor(
        public id: number,
        public nombre: string,
        public apellidos: string,
        public sip: Int16Array,
        public fecha_nac: Date,
        public sexo: string,
        public clase_econom: string,
        public deBaja: boolean
    ) {}
}
