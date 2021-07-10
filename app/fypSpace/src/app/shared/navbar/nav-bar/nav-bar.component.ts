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

    // left_nav_items: nav_item[] = [
    //     {
    //         display_name: "Home",
    //         router_link: ["/Home"],
    //         icon: "home",
    //     },
    // ];

    // mid_nav_items: nav_item[] = [
    //     {
    //         display_name: "Match",
    //         router_link: ["/matching"],
    //         icon: "supervisor_account",
    //     },

    // ];

    // right_nav_items: nav_item[] = [

    //     {
    //         display_name: "About",
    //         router_link: ["/about"],
    //     },
    //     {
    //         display_name: "FAQs",
    //         router_link: [""],
    //         childItem: [
    //             {
    //                 display_name: "FAQs for RMCT | FYP Students",
    //                 router_link: ['/FAQ', 'student'],
                    
    //             },
    //             {
    //                 display_name: "FAQ for FYP Supervisors",
    //                 router_link: ['/FAQ', 'supervisor'],
    //             },
    //             {
    //                 display_name: "FAQ for FYP Administrator",
    //                 router_link: ['/FAQ', 'admin'],
    //             }
    //         ]
    //     },
    //     {
    //         display_name: "Login",
    //         router_link: ["/user", "login"],
    //     },
    //     {
    //         display_name: "Register",
    //         router_link: ["/user", "register"],
    //     },
    //     {
    //         display_name: "Edit Profile",
    //         router_link: ["/user", "register"],
    //     },
    //     {
    //         display_name: "Log out",
    //         router_link: ["/user", "register"],
    //     },
    // ]

    childItemExist = (item: nav_item) => {
        return item.childItem != undefined ? true : false;
    };


    ngOnInit(): void {
        this._navbar.updateNavBar()
    }

}
