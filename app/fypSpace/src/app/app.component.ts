import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FYPspace';
  @ViewChild('sideNav', { static: true }) private sideNav?: MatSidenav;
  constructor(public sideNavService:SidenavService){

  };

  ngOnInit(){
      this.sideNavService.panel=this.sideNav;
  }


}
