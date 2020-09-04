import { NgModule } from '@angular/core';
export class Revision {

    constructor(
        public id: number,
        public fecha_revision: Date,
        public motivo: Text,
        public observ: Text,
        public coste_total: number,
        public coste_acum: number,
        public MedicoId: Int16Array
    ) {}

}
