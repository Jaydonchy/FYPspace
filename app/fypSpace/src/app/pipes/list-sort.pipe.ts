import { Pipe, PipeTransform } from '@angular/core';
import { listable, sortOption } from '../interfaces/list';

@Pipe({
    name: 'listSort',
})
export class ListSortPipe implements PipeTransform {

    transform<T extends listable>(items: T[] | null, sortOption: sortOption, ascending: boolean): T[] | null {
        if (!items || !sortOption || sortOption.comparator == null) {
            return items;
        }
        const sorted = items.sort(sortOption.comparator);
        return ascending ? sorted : sorted.reverse();
    }

}
