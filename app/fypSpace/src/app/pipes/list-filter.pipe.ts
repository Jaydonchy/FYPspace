
import { Pipe, PipeTransform } from '@angular/core';
import { filterConfig, filterOption, listable } from '../interfaces/list';

@Pipe({
    name: 'listFilter',
})
export class ListFilterPipe implements PipeTransform {
    resolveKeyPath(object: any, path: string) {
        return path.
            replace(/\[/g, '.').
            replace(/\]/g, '').
            split('.').
            reduce((o: any, k: string) => (o || {})[k], object);
    }

    transform<T extends listable>(items: T[] | null, filterConfig: filterConfig[] | null,update:Date): T[] | null {
        if (!items || !filterConfig) {
            return items;
        }
        const filterApplied = filterConfig.map(config => {
            let filterExists = false;
            if (config.type == 'select') {
                config.filterOptions.forEach(option => { if (option.enabled) filterExists = true })
            }
            return filterExists;
        }).some(filterExists => filterExists);
        //No Optional select filter applied
        if (!filterApplied) return items.filter(item => {
            //Check mandatory radio filters
            let included = true;
            filterConfig.forEach((config) => {
                if (config.type == 'radio') {
                    let enabledOption: filterOption | undefined = config.filterOptions.find(option => option.enabled);
                    if (enabledOption && enabledOption.filter_fn) {
                        included = enabledOption.filter_fn(item) ? true : false;
                    }
                }
            })
            return included
        });

        //There is an enabled filter
        const res = items.filter(item => {
            let included = false;
            let passAll = true;
            filterConfig.forEach((config) => {
                const itemvalue = this.resolveKeyPath(item, config.keyPath);
                if (config.type == 'select') {
                    const values = config.filterOptions.filter(option => option.enabled).map(option => option.value);
                    //Checks if there is an enabled option for that config as select options are optional
                    if (values.length > 0 && passAll) {
                        //item passed all previous filters and current filters
                        included = values.includes(itemvalue);
                        passAll = values.includes(itemvalue);
                        // included = !values.includes(itemvalue);
                    }
                } else if (config.type == 'radio') {
                    // console.log(config);
                    let enabledOption: filterOption | undefined = config.filterOptions.find(option => option.enabled);
                    // console.log(enabledOption)
                    if (enabledOption && enabledOption.filter_fn) {
                        //Pass previous filters
                        included = included && enabledOption.filter_fn(item) ? true : false;
                    }

                }
            });
            return included;
        })
        return res;
    }

}
