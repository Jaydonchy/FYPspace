import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { LecturerService } from 'src/app/services/lecturer.service';
import { StudentService } from 'src/app/services/student.service';
import { Observable, } from 'rxjs';
import { student_item, lecturer_item } from '../../interfaces/list';
import { MatchingService } from 'src/app/services/matching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-matching',
    templateUrl: './matching.component.html',
    styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit {

    constructor(
        private _backend: BackendService,
        public _matching: MatchingService,
        private _api: BackendService,
        public _snackbar: MatSnackBar,
        private router: Router,
    ) { }

    studentItems$?: Observable<student_item[]>;
    lecturerItems$?: Observable<lecturer_item[]>;
    studentItems?: student_item[];
    lecturerItems?: lecturer_item[];
    //Buttons
    showCancelBtn = false;
    showSupervisorBtn = false;
    showMarkerBtn = false;
    showDeAssignSupervisor = false;
    showDeAssignMarker = false;
    action_warning = ''


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

    //Toolbar button logic
    doCheck() {
        if (this._matching.selectedLecturer && this._matching.selectedStudent) {
            this.showSupervisorBtn = true;
            this.showMarkerBtn = true;
            this.showCancelBtn = true;
        }
        else if (this._matching.selectedLecturer || this._matching.selectedStudent) {
            this.showCancelBtn = true;
        }
        else if (!this._matching.selectedLecturer && !this._matching.selectedStudent) {
            this.showSupervisorBtn = false;
            this.showCancelBtn = false;
            this.showMarkerBtn = false;
        }
        //Deassignment option
        if (this._matching.selectedStudent) {

            this.showDeAssignMarker = this._matching.selectedStudent.assignment?.marker_id != null
                ? true
                : false;

            this.showDeAssignSupervisor = this._matching.selectedStudent.assignment?.supervisor_id != null
                ? true
                : false;
        } else {
            this.showDeAssignMarker = false;
            this.showDeAssignSupervisor = false;
        }
    }

    cancelSelection() {
        this._matching.selectedLecturer = undefined;
        this._matching.selectedStudent = undefined;
        this.doCheck();
    }

    refreshData() {
        this.getModel();
        this.cancelSelection();
    }

    async assignmentSubmit(isSupervisor: boolean, deAssignment: boolean = false) {
        const reqParam = this._matching.Assignment(isSupervisor,deAssignment);
        if (reqParam){
            this._api.doPost('/assignment/update', reqParam).then(
                res => res.subscribe({
                    next: res => {
                        this._snackbar.open('Assignment Updated', '', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        return this.refreshData();
                    },
                    error: err => {
                        this._snackbar.open('Assignment Unsuccessful!', '', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        console.log(err);
                    }
    
                })
            )
        } else {
            this._snackbar.open('Assignment Action Cancelled', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            })
        }
    }

    ngOnInit(): void {
        this.getModel();
    }
}
