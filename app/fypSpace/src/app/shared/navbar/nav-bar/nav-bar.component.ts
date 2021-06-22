import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    constructor() { }

    left_nav_items: nav_item[] = [
        {
            display_name: "Home",
            router_link: ["/"],
        },

    ];

    right_nav_items: nav_item[] = [
        {
            display_name: "About",
            router_link: ["/"],
        },
        {
            display_name: "FAQs",
            router_link: [""],
            childItem:[
                {
                    display_name :"FAQs for RMCT | FYP Students",
                    router_link: ['/FAQ','student'],
                },
                {
                    display_name: "FAQ for FYP Supervisors",
                    router_link: ['/FAQ','supervisor'],
                },
                {
                    display_name: "FAQ for FYP Administrator",
                    router_link: ['/FAQ','admin'],
                }
            ]
        },
        {
            display_name: "Login",
            router_link: ["/Login"],
        },
        {
            display_name: "Register",
            router_link: ["/Register"],
        },
    ]

    childItemExist = (item: nav_item) => {
        return item.childItem != undefined ? true : false;
    };

    ngOnInit(): void {
    }

}

export interface nav_item {
    display_name: string,
    router_link: string[],
    childItem?: nav_item[],
}