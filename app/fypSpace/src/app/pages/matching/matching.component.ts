import { Component, OnInit } from '@angular/core';
import { LecturerService } from 'src/app/services/lecturer.service';
import { StudentService } from 'src/app/services/student.service';
import { student_item, lecturer_item } from '../../interfaces/matching';

@Component({
    selector: 'app-matching',
    templateUrl: './matching.component.html',
    styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit {

    constructor(
        private _lecturer: LecturerService,
        private _student: StudentService,
    ) { }

    studentItems?: student_item[];
    lecturerItems?: lecturer_item[];

    selectStudent(item: student_item) {
        console.log(item.user.fullname);
    }

    selectLecturer(item: lecturer_item) {
        console.log(item.user.fullname);
    }

    ngOnInit(): void {
        this.studentItems = [
            {
                user: {
                    id: 5,
                    fullname: "Student 1",
                    email_work: "work@mail",
                    email_personal: "personal@mail",
                    contact_no: "0123456",
                    school_id: 1,
                    campus_id: 1,
                    is_full_time: true,
                },
                student: {
                    id: 3,
                    level_of_study: 2,
                    course_id: 2,
                    intake_id: 2,
                    tp_number: "432424",
                },
            },
            {
                user: {
                    id: 5,
                    fullname: "Student 2",
                    email_work: "work@mail",
                    email_personal: "personal@mail",
                    contact_no: "0123456",
                    school_id: 3,
                    campus_id: 2,
                    is_full_time: true,
                },
                student: {
                    id: 3,
                    level_of_study: 2,
                    course_id: 3,
                    intake_id: 2,
                    tp_number: "432424",
                },
            }
        ]
        this.lecturerItems = [
            {
                user: {
                    id: 5,
                    fullname: "Lecturer 1",
                    email_work: "work@staffmail",
                    email_personal: "personal@mail",
                    contact_no: "0123456",
                    school_id: 2,
                    campus_id: 3,
                    is_full_time: true,

                },
                lecturer: {
                    id: 1,
                    availability: true,
                    is_pm: true,
                    is_admin: false,
                    position_id: 4,
                    department_id: 5,
                    location_id: 6,
                }
            },
            {
                user: {
                    id: 5,
                    fullname: "Lecturer 2",
                    email_work: "work@staffmail",
                    email_personal: "personal@mail",
                    contact_no: "0123456",
                    school_id: 3,
                    campus_id: 1,
                    is_full_time: true,

                },
                lecturer: {
                    id: 1,
                    availability: true,
                    is_pm: true,
                    is_admin: true,
                    position_id: 4,
                    department_id: 5,
                    location_id: 6,
                }
            },
            {
                user: {
                    id: 5,
                    fullname: "Lecturer 2",
                    email_work: "work@staffmail",
                    email_personal: "personal@mail",
                    contact_no: "0123456",
                    school_id: 2,
                    campus_id: 2,
                    is_full_time: true,

                },
                lecturer: {
                    id: 1,
                    availability: true,
                    is_pm: false,
                    is_admin: true,
                    position_id: 4,
                    department_id: 5,
                    location_id: 6,
                }
            },
        ]
    }

}
