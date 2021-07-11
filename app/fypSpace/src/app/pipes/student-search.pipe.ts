import { Pipe, PipeTransform } from '@angular/core';
import { student_item } from '../interfaces/list';
import { StudentService } from '../services/student.service';
import { UserService } from '../services/user.service';

@Pipe({
    name: 'studentSearch'
})
export class StudentSearchPipe implements PipeTransform {

    constructor(
        private _student: StudentService,
        private _user: UserService,
    ) { }

    transform(items: student_item[] | null, searchValue: string): student_item[] | null {
        if (!items || !searchValue) {
            return items;
        }
        const searchString = searchValue.toLocaleLowerCase();
        return items.filter(item => {
            return item.user.fullname.toLocaleLowerCase().includes(searchString) ||
                this._user.getCampusNameById(item.user.campus_id).toLocaleLowerCase().includes(searchString) ||
                this._user.getSchoolNameById(item.user.school_id).toLocaleLowerCase().includes(searchString) ||
                item.student.tp_number.toLocaleLowerCase().includes(searchString) ||
                this._student.getCourseNameById(item.student.course_id).toLocaleLowerCase().includes(searchString) ||
                (item.assignment?.title ? item.assignment.title:'' ).toLocaleLowerCase().includes(searchString)||
                this._student.getIntakeNameById(item.student.intake_id).toLocaleLowerCase().includes(searchString);
        })
    }

}
