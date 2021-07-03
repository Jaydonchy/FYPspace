import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { LecturerService } from 'src/app/services/lecturer.service';
import { StudentService } from 'src/app/services/student.service';
import { Observable, } from 'rxjs';
import { student_item, lecturer_item } from '../../interfaces/list';
import { MatchingService } from 'src/app/services/matching.service';

@Component({
    selector: 'app-matching',
    templateUrl: './matching.component.html',
    styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit {

    constructor(
        private _lecturer: LecturerService,
        private _student: StudentService,
        private _backend: BackendService,
        public _matching: MatchingService,
    ) { }

    studentItems$?: Observable<student_item[]>;
    lecturerItems$?: Observable<lecturer_item[]>;
    studentItems?: student_item[];
    lecturerItems?: lecturer_item[];
    showCancelBtn = false;
    showSupervisorBtn = false;
    showMarkerBtn = false;
    action_warning=''


    getModel() {
        this._backend.doGet<student_item[]>('/student/item/all').then(
            res => this.studentItems$ = res
        )

        this._backend.doGet<lecturer_item[]>('/lecturer/item/all').then(
            res => this.lecturerItems$ = res
        )
    }

    selectStudent(item: student_item) {
        this._matching.selectedStudent = item.user.user_id == this._matching.selectedStudent?.user?.user_id ?
            undefined : item;
        this.doCheck();
    }

    selectLecturer(item: lecturer_item) {
        this._matching.selectedLecturer = item.user.user_id == this._matching.selectedLecturer?.user?.user_id ?
            undefined : item;
        this.doCheck()
    }

    doCheck() {
        if (this._matching.selectedLecturer && this._matching.selectedStudent) {
            this.showSupervisorBtn = true;
            this.showMarkerBtn = true;
            this.showCancelBtn = true;
        }
        else if (this._matching.selectedLecturer || this._matching.selectedStudent) {
            this.showCancelBtn = true;
        }
        else if (!this._matching.selectedLecturer && !this._matching.selectedStudent){
            this.showSupervisorBtn = false;
            this.showCancelBtn = false;
            this.showMarkerBtn = false;
        }
    }

    cancelSelection() {
        this._matching.selectedLecturer = undefined;
        this._matching.selectedStudent = undefined;
        this.doCheck();
    }

    ngOnInit(): void {
        this.getModel();
    }
}
