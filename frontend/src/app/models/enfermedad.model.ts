import { NgModule } from '@angular/core';
export class Enfermedad {

    constructor(
        public id: Int16Array,
        public nombre: string,
        public descripcion: string,
        public fecha: Date
    ) {}

}
