import { Component, Input, OnInit, } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { student_item } from '../../../../interfaces/list';
import { lecturer_simple, proposed_lecturer } from '../../../../interfaces/db_models';
import { LecturerService } from 'src/app/services/lecturer.service';

@Component({
    selector: 'app-student-item',
    templateUrl: './student-item.component.html',
    styleUrls: ['../../matching.component.scss']
})
export class StudentItemComponent implements OnInit {

    @Input() item!: student_item;
    @Input() isSelected = false;
    supervisor_name = 'Supervisor Unassigned';
    marker_name = 'Marker Unassigned';
    proposed_lecturer = "No proposed lecturer";
    sypnopsis = 'No sypnosis found';

    constructor(
        public _student: StudentService,
        public _lecturer: LecturerService,
        public _user: UserService,
        private _backend: BackendService,
    ) { }

    getSupervisorName() {
        const req = this._backend.doGet<lecturer_simple>(`/lecturer/simple/${this.item.assignment?.supervisor_id}`)
            .then(res => res.subscribe({
                next: ({ fullname }) => {
                    this.supervisor_name = `Supervisor: ${fullname}`;
                },
                error: err => {
                    console.warn(`Unable to retrieve supervisor name : ${err}`);
                }
            }));
    }

    getMarkerName() {
        this._backend.doGet<lecturer_simple>(`/lecturer/simple/${this.item.assignment?.marker_id}`)
            .then(res => res.subscribe({
                next: ({ fullname }) => {
                    this.marker_name = `2nd Marker: ${fullname}`;
                },
                error: err => {
                    console.warn(`Unable to retrieve marker name : ${err}`);
                }
            }));
    }

    getProposedLecturer() {
        this._backend.doGet<proposed_lecturer[]>(`/student/proposed/${this.item.student.student_id}`)
            .then(res => res.subscribe({
                next: (proposed) => {
                    if (proposed.length > 0) {
                        let string = '';
                        proposed.forEach(({ lecturer_name }) => {
                            string += lecturer_name;
                            string += `
                            `;
                        })
                        this.proposed_lecturer = string;
                    }
                },
                error: err => {
                    console.warn(`Unable to retrieve proposed_lecturer name : ${err}`);
                }
            }));
    }

    ngOnInit(): void {
        if (this.item.assignment?.supervisor_id) this.getSupervisorName();
        if (this.item.assignment?.marker_id) this.getMarkerName();
        this.getProposedLecturer();

    }

}
