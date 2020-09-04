import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService) { }

  ngOnInit(): void {
  }

}
