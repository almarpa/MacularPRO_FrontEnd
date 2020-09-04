import { Component, OnInit } from '@angular/core';
import { Revision } from '../../models/revision.model';
import { ActivatedRoute } from '@angular/router';
import { RevisionService } from '../../services/revision/revision.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styles: [
  ]
})
export class RevisionComponent implements OnInit {

  rol: string;
  id: number;
  revision: Revision = new Revision (null,null,null,null,null,null,null);
  control2: boolean = false;
  pacienteId: number;

  constructor(public _revisionService: RevisionService,
              public activatedRoute: ActivatedRoute) 
              {
                  activatedRoute.params.subscribe(params => {      
                    // Cargar información del médico seleccionado
                    this.cargarRevision(params['idRevision']);
                    // Guardamos su ID
                    this.pacienteId = params['idPaciente'];
                  });

                  // Obtenemos el rol del usuario logueado para restringir ciertas funcionalidades
                  this.rol = localStorage.getItem('rol');
              }

  ngOnInit(): void {
  }

  cargarRevision(id: number){

    this._revisionService.cargarRevision(id)
    .subscribe( (revision: Revision) => {
      this.revision = revision;
    });
    
  }

  editarRevision(revision: Revision){

    revision.id = this.revision.id;

    this._revisionService.editarRevision(this.pacienteId, revision)
      .subscribe();
  }

  activarFormulario(){

    if(!this.control2){
      this.control2 = true;
    }else {
      this.control2 = false;
    }
  }
}
