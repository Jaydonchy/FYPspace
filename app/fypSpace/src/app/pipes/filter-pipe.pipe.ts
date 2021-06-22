import { Pipe, PipeTransform } from '@angular/core';

// Generic Filter Pipe

@Pipe({
    name: 'filterPipe',
    pure: false,
})
export class FilterPipePipe implements PipeTransform {
    transform(items: any[], callback: (item:any)=> boolean , res_type: boolean): any {
        //if no argument
        if (!items || !callback) {
            console.log("Missing Argument for filterPipe");
            return items;
        }
        return res_type ? items.filter(item => callback(item))
            : items.filter(item => !callback(item));
    }
};
