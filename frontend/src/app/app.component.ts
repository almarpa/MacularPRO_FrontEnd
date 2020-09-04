import { Component } from '@angular/core';
import { SidebarService, SharedService, MedicoService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor( ) {}
}
