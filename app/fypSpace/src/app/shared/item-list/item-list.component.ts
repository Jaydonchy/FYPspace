import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    @Input() header = "placeholder list header";
    @ViewChild('filterPanel', { static: true }) filterPanel?: TemplateRef<any>;
    @ViewChild('sortPanel', { static: true }) sortPanel?: TemplateRef<any>;
    searchString = "";

    constructor(
        public sideNavService: SidenavService,
        private vcf: ViewContainerRef,
    ) { }

    //Open Right Panel
    openSideNav(templateRef: TemplateRef<any>) {
        const portal = new TemplatePortal(templateRef, this.vcf);
        // this.sidenavService.setPanelPortal(portal);
        this.sideNavService.open(portal);
    }

    sort() {
        this.sideNavService.title = "Sort";
        this.sideNavService.icon = "sort";
        return this.sortPanel != undefined ? this.openSideNav(this.sortPanel) : null;
    }

    filter() {
        this.sideNavService.title = "Filter";
        this.sideNavService.icon = "filter_alt";
        return this.filterPanel != undefined ? this.openSideNav(this.filterPanel) : null;
    }

    ngOnInit(): void {
    }


}
