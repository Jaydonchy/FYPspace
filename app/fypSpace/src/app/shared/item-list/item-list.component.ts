import { Component, Input, Output, OnInit, TemplateRef, ViewChild, ViewContainerRef, EventEmitter } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { filterConfig, listable,sortOption } from 'src/app/interfaces/list';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    @Input() header = "placeholder list header";
    @ViewChild('filterPanel', { static: true }) filterPanel?: TemplateRef<any>;
    
    @Input() sortOptions!:sortOption[]
    @Input() asc!:boolean
    @Output() selectedSortEmitter = new EventEmitter<sortOption>();
    @Output() ascEmitter = new EventEmitter<boolean>();

    @ViewChild('sortPanel', { static: true }) sortPanel?: TemplateRef<any>;
    @Output() searchStringEmitter = new EventEmitter<string>();
    searchString = "";

    //Filter
    @Input() filterConfigs!: filterConfig[];
    //Sort

    constructor(
        public sideNavService: SidenavService,
        private vcf: ViewContainerRef,
    ) { }

    onSearchChange(newValue: string) {
        this.searchStringEmitter.emit(newValue);
    }

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
