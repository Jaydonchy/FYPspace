import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lecturer_load, lecturer_meeting } from 'src/app/interfaces/table';
import { AuthService } from 'src/app/services/auth.service';
import { LecturerWorkloadService } from 'src/app/services/lecturer-workload.service';

@Component({
    selector: 'app-lecturer-dashboard',
    templateUrl: './lecturer-dashboard.component.html',
    styleUrls: ['./lecturer-dashboard.component.scss']
})
export class LecturerDashboardComponent implements OnInit {

    workload_stats:stat_item[] = [
        {
            title: 'Supervisory Load',
            number: 0,
            detail:[]
        },
        {
            title: 'Marker Load',
            number: 0,
            detail:[]
        },
        {
            title: 'Total',
            number: 0,
            detail:[]
        },
        {
            title: 'Meeting log',
            number: 0,
            detail:[]
        },
    ]

    allWorkload: lecturer_load[] = [];
    supervisorWorkload: lecturer_load[] = [];
    markerWorkload: lecturer_load[] = [];
    meetingLogs: lecturer_meeting[] = [];

    createStatItem(name: string, number: number) {
        return {
            name: name,
            number: number
        }
    }

    constructor(
        public _lecturerWorkload: LecturerWorkloadService,
        public _auth: AuthService
    ) { }

    ngOnInit(): void {
        const [sv_load, m_load, total, meeting_logs] = this.workload_stats;
        if (this._auth.loggedInUser?.lecturer) {
            this._lecturerWorkload.lecturerWorkload$?.subscribe(res => {
                total.number = res.length;
                this.allWorkload = res;
                //Supervisor Stats
                const supervisor_load = res.filter(lecturer_load => lecturer_load.assignment.supervisor_id == this._auth.loggedInUser?.lecturer?.lecturer_id)
                sv_load.number = supervisor_load.length;
                this.supervisorWorkload = supervisor_load;
                let marked_ppf = supervisor_load.filter(load => load.assignment.ppf_approved);
                let newS_load = [];
                newS_load.push(this.createStatItem('Unmarked PPF', supervisor_load.length - marked_ppf.length));
                newS_load.push(this.createStatItem('Marked PPF', marked_ppf.length));
                sv_load.detail = newS_load;
                //Marker Stats
                const marker_load = res.filter(lecturer_load => lecturer_load.assignment.marker_id == this._auth.loggedInUser?.lecturer?.lecturer_id)
                m_load.number = marker_load.length
                this.markerWorkload = marker_load;
                let marked_psf = supervisor_load.filter(load => load.assignment.psf_approved);
                let newM_load = [];
                newM_load.push(this.createStatItem('Unmarked PSF', marker_load.length - marked_psf.length));
                newM_load.push(this.createStatItem('Marked PSF', marked_psf.length));
                m_load.detail = newM_load;
            })

            this._lecturerWorkload.lecturerMeeting$?.subscribe(res => {
                const visible = res.filter(e => e.visible)
                meeting_logs.number = visible.length;
                this.meetingLogs = visible;
                let approved_meeting = visible.filter(meeting=> meeting.approved)
                let newMeeting = []
                newMeeting.push(this.createStatItem('Unapproved Meeting Logs',visible.length-approved_meeting.length))
                newMeeting.push(this.createStatItem('Approved Meeting Logs',approved_meeting.length))
                meeting_logs.detail = newMeeting;
            })

            this._lecturerWorkload.getLecturerWorkload(this._auth.loggedInUser?.lecturer?.lecturer_id);
            this._lecturerWorkload.getLecturerMeetings(this._auth.loggedInUser.lecturer.lecturer_id)
        }
    }

}

export interface stat_item {
    title:string,
    number:number,
    detail: {name:string,number:number}[]
} 