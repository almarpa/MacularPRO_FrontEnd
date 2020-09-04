import { NgModule } from '@angular/core';
export class Medicion {

    constructor(
        public id: number,
        public fecha_creacion: Date,
        public agudeza_visual: number,
        public per_luz: boolean,
        public mov_manos: boolean,
        public cont_dedos: boolean
    ) {}

}
