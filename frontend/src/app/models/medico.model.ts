import { NgModule } from '@angular/core';
export class Medico {

    constructor(
        public id: Int16Array,
        public nombre: string,
        public apellidos: string,
        public correo: string,
        public password: string,
        public sexo: string, 
        public telefono: bigint,
        public servicio_unidad: string,
        public num_colegiado: bigint,
        public centro: string,
        public deBaja: boolean,
        public rol: string
    ) {}

}
