import { Injectable } from '@angular/core';
import { nav_item } from '../shared/navbar/nav-bar/nav-item';
import { getNavItems } from '../shared/navbar/nav-bar/nav-item'
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    public left_nav_items: nav_item[] = [];
    public mid_nav_items: nav_item[] = [];
    public right_nav_items: nav_item[] = [];

    constructor(
        private _auth: AuthService,
    ) {
        this._auth.loggedInUser$.asObservable().subscribe(stateChange => {
            this.updateNavBar();
        })
    }

    updateNavBar() {
        const user = this._auth.loggedInUser;
        const navItems = getNavItems();
        if (!user) {
            this.left_nav_items = [];
            this.mid_nav_items = [];
            this.right_nav_items = this.resolveNavItems(['About', 'FAQs', 'Login', 'Register'], navItems.right_nav_items)
        } else {
            this.left_nav_items = navItems.left_nav_items;
            this.mid_nav_items = navItems.mid_nav_items;
            this.right_nav_items = this.resolveNavItems(['About', 'FAQs', 'Edit Profile', 'Log out'], navItems.right_nav_items)
        }
    }

    resolveNavItems(itemString: string[], navItems: nav_item[]) {
        const lowerCase = itemString.map(e => e.toLocaleLowerCase());
        return navItems.filter(navItem => {
            return lowerCase.includes(navItem.display_name.toLocaleLowerCase());
        })
    }
}
