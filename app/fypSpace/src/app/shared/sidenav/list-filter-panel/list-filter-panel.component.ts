import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { filterConfig, filterOption } from 'src/app/interfaces/list';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
    selector: 'app-list-filter-panel',
    templateUrl: './list-filter-panel.component.html',
    styleUrls: ['./list-filter-panel.component.scss']
})
export class ListFilterPanelComponent implements OnInit {

    constructor(
        public _sidenav: SidenavService,
    ) { }

    @Input() filterConfigs: filterConfig[] = [];

    selectedFilters: filterConfig[] = [];

    addFilter(config: filterConfig, option: filterOption) {
        this.filterConfigs?.some(filterConfig => {
            if (filterConfig.keyPath == config.keyPath) {
                filterConfig.filterOptions.some(filterOption => {
                    if (filterOption.value == option.value) {
                        filterOption.enabled = true;
                        return true;
                    } return false;
                })
                return true;
            } return false;
        }
        )
    }

    removeFilter(config: filterConfig, option: filterOption) {
        this.filterConfigs?.some(filterConfig => {
            if (filterConfig.keyPath == config.keyPath) {
                filterConfig.filterOptions.some(filterOption => {
                    if (filterOption.value == option.value) {
                        filterOption.enabled = false;
                        return true;
                    } return false;
                })
                return true;
            } return false;
        }
        )
    }

    clearSelectedFilter() {
        this.filterConfigs.forEach(config => {
            config.filterOptions.forEach(option => option.enabled = false)
        })
    }

    ngOnInit(): void {
    }

}
