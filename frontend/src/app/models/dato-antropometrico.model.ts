import { NgModule } from '@angular/core';
export class DatoAntropometrico {

    constructor(
        public id: Int16Array,
        public fecha_creacion: Date,
        public obesidad: string,
        public peso: number,
        public altura: number,
        public perim_abdominal: number,
        public imc: number
    ) {}

}
