import { ComponentPortal, ComponentType, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { from, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    constructor() { }

    /** The panel. */
    panel?: MatSidenav;
    private viewContainerRef?: ViewContainerRef;
    private panelPortal$ = new Subject<Portal<any>>();
    //panel config
    title = "placeholder title";
    icon?: string;

    /** Retrieves the current panel portal as an `Observable`. */
    get panelPortal() {
        return from(this.panelPortal$);
    }

    /** Resets the current panel portal. */
    clearPanelPortal() {
        this.panelPortal$.next(undefined);
    }

    /** Opens the panel with optionally a portal to be set. */
    open(portal?: Portal<any>) {
        if (portal) {
            this.panelPortal$.next(portal);
        }
        return this.panel != undefined ? this.panel.open() : null;
    }

    /** Toggles the panel. */
    toggle() {
        return this.panel != undefined ? this.panel.toggle() : null;
    }

    /** Closes the panel. */
    close() {
        return this.panel != undefined ? this.panel.toggle() : null;
    }
}
