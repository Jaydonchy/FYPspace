import { Component, Input, OnInit } from '@angular/core';
import { lecturer_meeting } from 'src/app/interfaces/table';

@Component({
    selector: 'app-lecturer-meeting-table',
    templateUrl: './lecturer-meeting-table.component.html',
    styleUrls: ['./lecturer-meeting-table.component.scss']
})
export class LecturerMeetingTableComponent implements OnInit {

    constructor() { }
    displayedColumns = [
        'student_name',
        'assignment_title',
        'meeting_time',
        'approved',
    ];
    @Input() lecturerMeetingData: lecturer_meeting[] = [];

    ngOnInit(): void {
    }

}
