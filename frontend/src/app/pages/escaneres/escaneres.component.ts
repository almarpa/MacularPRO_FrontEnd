import { Component, OnInit } from '@angular/core';
import { Ojo } from '../../models/ojo.model';
import { Escaner } from '../../models/escaner.model';
import { EscanerService } from '../../services/service.index';
import { OjoService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-escaneres',
  templateUrl: './escaneres.component.html',
  styles: [
  ]
})
export class EscaneresComponent implements OnInit {

  rol: string;
  ojos : Ojo[];
  ojo_seleccionado: Ojo;
  escaneres: Escaner[] = [];
  escaner: Escaner = new Escaner(null,null,null,null, null,null,null, null,null);
  numEscaner: number;
  idPaciente: number;
  idRevision: number;

  formulario: FormGroup;
  
  controlList: boolean = false;
  controlNuevoEscaner: boolean = false;
  controlEdicion: boolean = false;

  constructor(public _ojoService: OjoService,
              public _escanerService: EscanerService,
              public activatedRoute: ActivatedRoute
    ) {
      activatedRoute.params.subscribe(params => {      
        // Cargar información del paciente seleccionado
        this.idPaciente = params['idPaciente'];
        this.idRevision = params['idRevision'];
      });

      // Para llenar el combobox con los ojos (IZQ y DER) revisados en la revisión previamente seleccionada
      this.cargarOjos(this.idPaciente, this.idRevision);

      this.formulario = new FormGroup({
        id: new FormControl(null, Validators.required),
        edema_mac_quis: new FormControl(null, Validators.required),
        grosor_retina: new FormControl(null, Validators.required),
        puntos_reflectantes: new FormControl(null, Validators.required),
        liquido_subrret: new FormControl(null, Validators.required),
        afectacion_capa_int: new FormControl(null, Validators.required),
        afectacion_capa_ext: new FormControl(null, Validators.required),
        tipo_memb_neov: new FormControl(null, Validators.required),
      });

      // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
      this.rol = localStorage.getItem('rol');
  }

  ngOnInit(): void {

  }

  cargarOjos(pacienteId: number, revisionId: number){

    this._ojoService.cargarOjosPorRevision(pacienteId, revisionId)
          .subscribe( (ojos: Ojo[]) => {
              this.ojos = ojos;
          })
  }

  cargarEscaneresDelOjo(){

    this._escanerService.getEscaneresByRevisionOjo(this.idPaciente, this.ojo_seleccionado.id)
          .subscribe( (escaneres: Escaner[]) => {
              this.escaneres = escaneres;
          })
  }

  // Carga los datos del escáner seleccionado para su edición
  cargarEscaner(idEscaner: number, pos: number){
    
    this.numEscaner = pos;

    this._escanerService.cargarEscaner(idEscaner)
      .subscribe( (escaner: Escaner) => {
        this.escaner = escaner;
      });
  }

  crearEscaner(escaner: Escaner) {

    if(this.ojo_seleccionado == undefined){

        Swal.fire('Seleccione un ojo para poder crear el escáner de retina');

    }else {

        this._escanerService.crearEscaner(this.idPaciente, this.ojo_seleccionado.id, escaner)
            .subscribe(resp =>{
                console.log(resp);
        });

        //Actualizar la lista de escáneres
        window.location.reload();
    }
  }

  editarEscaner(escaner: Escaner){

    console.log(escaner)

    this._escanerService.editarEscaner(this.idPaciente, escaner)
        .subscribe();

    //Actualizar la lista de escáneres
    window.location.reload();
  }

  activarFormulario(){
    
    if(this.ojo_seleccionado.ojo_revision == "IZQUIERDO" || this.ojo_seleccionado.ojo_revision == "DERECHO"){
        this.controlList = true;
    } 
    else{ 
        this.controlList = false;
    } 
  }

  activarFormularioListado(){
    if(this.controlList === true){
      this.controlList = false;
    } 
    else{ 
      this.controlList = true;} 
  }

  activarFormularioCreacion(){

    if(this.controlNuevoEscaner === true){
      this.controlNuevoEscaner = false;
    } 
    else{ 
      this.controlNuevoEscaner = true;
      this.controlEdicion = false;
    } 
  }

  activarFormularioEdicion(){

    if(this.controlEdicion === false) {
      this.controlNuevoEscaner = false;
      this.controlEdicion = true;
    }
  }
}
