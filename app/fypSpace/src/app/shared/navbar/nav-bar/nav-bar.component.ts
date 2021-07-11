import { Component, OnInit } from '@angular/core';
import { authUser } from 'src/app/interfaces/db_models';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { nav_item } from './nav-item';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    constructor(
        public _auth: AuthService,
        public _navbar: NavbarService,
    ) { }

    childItemExist = (item: nav_item) => {
        return item.childItem != undefined ? true : false;
    };


    ngOnInit(): void {
        this._navbar.updateNavBar()
    }

}
