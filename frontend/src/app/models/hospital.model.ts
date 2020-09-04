import { NgModule } from '@angular/core';
export class Hospital {

    constructor(
        public _id: Int16Array,
        public nombre: string,
        public ciudad: string,
        public telefono: bigint,
        public url: string,
    ) {}

}
