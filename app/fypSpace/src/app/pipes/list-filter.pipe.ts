import { OverlayConfig } from '@angular/cdk/overlay';
import { TypeScriptEmitter } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { filterConfig, filterOption, listable } from '../interfaces/list';

@Pipe({
    name: 'listFilter',
    pure: false,
})
export class ListFilterPipe implements PipeTransform {
    resolveKeyPath(object: any, path: string) {
        return path.
            replace(/\[/g, '.').
            replace(/\]/g, '').
            split('.').
            reduce((o: any, k: string) => (o || {})[k], object);
    }

    transform<T extends listable>(items: T[] | null, filterConfig: filterConfig[] | null): T[] | null {
        if (!items || !filterConfig) {
            return items;
        }
        const filterApplied = filterConfig.map(config => {
            let filterExists = false;
            config.filterOptions.forEach(option => { if (option.enabled) filterExists = true })
            return filterExists;
        }).some(filterExists => filterExists);
        //No filter applied
        if(!filterApplied) return items;
        
        const res = items.filter(item => {
            let included = false;
            filterConfig.forEach((config) => {
                const values = config.filterOptions.filter(option => option.enabled).map(option => option.value);
                if (values.length > 0) {
                    //There is an enabled filter
                    const itemvalue = this.resolveKeyPath(item, config.keyPath);
                    //Items would have to pass all filter test
                    if (values.includes(itemvalue)) included = true;
                    else included = false;
                }
            });
            return included;
        })
        return res;
    }

}
