import { Component, OnInit } from '@angular/core';
import { Ojo } from '../../models/ojo.model';
import { Medicion } from '../../models/medicion.model';
import { MedicionService } from '../../services/service.index';
import { OjoService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.component.html',
  styles: [
  ]
})
export class MedicionesComponent implements OnInit {

  rol: string;
  ojos : Ojo[];
  ojo_seleccionado: Ojo;
  mediciones: Medicion[] = [];
  medicion: Medicion = new Medicion(null,null,null,null,null,null);
  numMedicion: number;
  idPaciente: number;
  idRevision: number;

  formulario: FormGroup;
  
  controlList: boolean = false;
  controlNuevaMedicion: boolean = false;
  controlEdicion: boolean = false;

  constructor(public _ojoService: OjoService,
              public _medicionService: MedicionService,
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
        agudeza_visual: new FormControl(null, Validators.required),
        per_luz: new FormControl(null, Validators.required),
        mov_manos: new FormControl(null, Validators.required),
        cont_dedos: new FormControl(null, Validators.required),
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

  cargarMedicionesDelOjo(){

    this._medicionService.getMedicionesByRevisionOjo(this.idPaciente, this.ojo_seleccionado.id)
          .subscribe( (mediciones: Medicion[]) => {
              this.mediciones = mediciones;
          })
  }

  // Carga los datos del medición seleccionado para su edición
  cargarMedicion(idMedicion: number, pos: number){
    
    this.numMedicion = pos;

    this._medicionService.cargarMedicion(idMedicion)
      .subscribe( (medicion: Medicion) => {
        this.medicion = medicion;
      });
  }

  crearMedicion(medicion: Medicion) {

    console.log(medicion);

    if(this.ojo_seleccionado == undefined){

        Swal.fire('Seleccione un ojo para poder crear la medición.');

    }else {

      // Comprobar si ha seleccionado un valor para los sliders
      if((medicion.agudeza_visual != null) &&
          medicion.per_luz != null &&
          medicion.cont_dedos != null &&
          medicion.mov_manos != null) {

          this._medicionService.crearMedicion(this.idPaciente, this.idRevision, this.ojo_seleccionado.id, medicion)
              .subscribe();

          //Actualizar la lista de mediciones
          window.location.reload();

      }else {

        Swal.fire('Seleccione un valor para cada uno de los campos del formulario de creación.');
      }
        
    }
  }

  editarMedicion(medicion: Medicion){
            
      this._medicionService.editarMedicion(this.idPaciente, medicion)
        .subscribe();

      //Actualizar la lista de mediciones
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

    if(this.controlNuevaMedicion === true){
      this.controlNuevaMedicion = false;
    } 
    else{ 
      this.controlNuevaMedicion = true;
      this.controlEdicion = false;
    } 
  }

  activarFormularioEdicion(){

    if(this.controlEdicion === false) {
      this.controlNuevaMedicion = false;
      this.controlEdicion = true;
    }
  }

  
}
