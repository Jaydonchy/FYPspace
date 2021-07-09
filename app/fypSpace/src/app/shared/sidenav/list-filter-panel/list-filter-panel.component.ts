import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { filterConfig, filterOption } from 'src/app/interfaces/list';
import { MatchingService } from 'src/app/services/matching.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
    selector: 'app-list-filter-panel',
    templateUrl: './list-filter-panel.component.html',
    styleUrls: ['./list-filter-panel.component.scss']
})
export class ListFilterPanelComponent implements OnInit {

    constructor(
        public _sidenav: SidenavService,
        private _matching: MatchingService,
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
        this._matching.filterPipeUpdate = new Date();
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
        this._matching.filterPipeUpdate = new Date();
    }

    changeRadioConfig(config: filterConfig, event: filterOption) {
        this.filterConfigs?.some(filterConfig => {
            if (filterConfig.filter_name == config.filter_name) {
                filterConfig.filterOptions.forEach(option => {
                    if (option.disp == event.disp) {
                        option.enabled = true;
                    } else {
                        option.enabled = false;
                    }
                })
                return true;
            } return false;
        })
        this._matching.filterPipeUpdate = new Date();
    }

    getSelectedRadio(config: filterConfig) {
        const [res, ...arg] = config.filterOptions.filter(option => option.enabled);
        return res;
    }

    clearSelectedFilter() {
        this.filterConfigs.forEach(config => {
            config.filterOptions.forEach(option => { if (config.type == 'select') option.enabled = false })
        })
        this._matching.filterPipeUpdate = new Date();
    }

    ngOnInit(): void {
    }

}
