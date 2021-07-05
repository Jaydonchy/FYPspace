import { Pipe, PipeTransform } from '@angular/core';
import { lecturer_item } from '../interfaces/list';
import { LecturerService } from '../services/lecturer.service';
import { UserService } from '../services/user.service';

@Pipe({
    name: 'lecturerSearch'
})
export class LecturerSearchPipe implements PipeTransform {

    constructor(
        private _lecturer: LecturerService,
        private _user: UserService,
    ) { }

    transform(items: lecturer_item[] | null, searchValue: string): lecturer_item[] | null {
        if (!items || !searchValue) {
            return items;
        }
        const searchString = searchValue.toLocaleLowerCase();

        return items.filter(item => {
            return item.user.fullname.toLocaleLowerCase().includes(searchString) ||
                this._user.getCampusNameById(item.user.campus_id).toLocaleLowerCase().includes(searchString) ||
                this._user.getSchoolNameById(item.user.school_id).toLocaleLowerCase().includes(searchString) ||
                this._lecturer.getLocationById(item.lecturer.location_id).toLocaleLowerCase().includes(searchString) ||
                this._lecturer.getDepartmentById(item.lecturer.department_id).toLocaleLowerCase().includes(searchString) ||
                this._lecturer.getPositionById(item.lecturer.position_id).toLocaleLowerCase().includes(searchString);
        })
    }

}
