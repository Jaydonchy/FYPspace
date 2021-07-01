import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { student_item } from '../../../../interfaces/matching';

@Component({
    selector: 'app-student-item',
    templateUrl: './student-item.component.html',
    styleUrls: ['../../matching.component.scss']
})
export class StudentItemComponent implements OnInit {

    @Input() item?: student_item | null;
    constructor(
        private _student: StudentService,
    ) { }

    ngOnInit(): void {
        console.log(this.item);
    }

}
