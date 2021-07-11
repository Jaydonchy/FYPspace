import { Component, OnInit } from '@angular/core';
import { lecturer_load, lecturer_meeting } from 'src/app/interfaces/table';
import { AuthService } from 'src/app/services/auth.service';
import { LecturerWorkloadService } from 'src/app/services/lecturer-workload.service';

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

    constructor(
        private _lecturerWorkload: LecturerWorkloadService,
        private _auth: AuthService
    ) {
    }

    allWorkload: lecturer_load[] = [];
    supervisorWorkload: lecturer_load[] = [];
    markerWorkload: lecturer_load[] = [];
    meetingLogs: lecturer_meeting[] = [];

    ngOnInit(): void {
        if (this._auth.loggedInUser?.lecturer) {
            this._lecturerWorkload.lecturerWorkload$?.subscribe(res => {
                this.allWorkload = res;
                this.supervisorWorkload = res.filter(load => load.assignment.supervisor_id == this._auth.loggedInUser?.lecturer?.lecturer_id)
                this.markerWorkload = res.filter(load => load.assignment.marker_id == this._auth.loggedInUser?.lecturer?.lecturer_id)
            })
            this._lecturerWorkload.getLecturerWorkload(this._auth.loggedInUser?.lecturer?.lecturer_id);
        }
    }

}
