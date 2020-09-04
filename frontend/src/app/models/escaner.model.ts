import { NgModule } from '@angular/core';
export class Escaner {

    constructor(
        public id: number,
        public fecha_creacion: Date,
        public edema_mac_quis: boolean,
        public grosor_retina: number,
        public puntos_reflectantes: boolean,
        public liquido_subrret: boolean, 
        public afectacion_capa_int: boolean,
        public afectacion_capa_ext: boolean,
        public tipo_memb_neov: string
    ) {}

}
