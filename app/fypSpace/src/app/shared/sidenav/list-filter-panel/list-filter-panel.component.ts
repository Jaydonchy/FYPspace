import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { filterConfig, filterOption } from 'src/app/interfaces/list';

@Component({
    selector: 'app-list-filter-panel',
    templateUrl: './list-filter-panel.component.html',
    styleUrls: ['./list-filter-panel.component.scss']
})
export class ListFilterPanelComponent implements OnInit {

    constructor() { }

    @Input() filterConfigs: filterConfig[] = [];
    @Output() filterConfigEmitter = new EventEmitter<filterConfig[]>();
    filterConfigs$ = new Subject<filterConfig[]>();

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
        this.filterConfigs$.next(this.getEnabledOptionsOnly(this.filterConfigs));
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
        this.filterConfigs$.next(this.getEnabledOptionsOnly(this.filterConfigs));
    }

    getEnabledOptionsOnly(filterConfigs: filterConfig[]): filterConfig[] {
        return this.filterConfigs.map(config => {
            let { filter_name, keyPath, filterOptions } = config;
            return {
                filter_name: filter_name,
                keyPath: keyPath,
                filterOptions: filterOptions.map(x => x).filter(option => option.enabled)
            }
        });
    }

    ngOnInit(): void {
    }

}
