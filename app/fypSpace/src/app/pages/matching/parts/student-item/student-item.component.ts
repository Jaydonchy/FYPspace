import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { student_item } from '../../../../interfaces/matching';

@Component({
    selector: 'app-student-item',
    templateUrl: './student-item.component.html',
    styleUrls: ['../../matching.component.scss']
})
export class StudentItemComponent implements OnInit {

    @Input() item!: student_item;
    constructor(
        public _student: StudentService,
        public _user: UserService,
    ) { }
    ngOnInit(): void {
    }


}
