import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lecturer_load } from 'src/app/interfaces/table';

@Component({
    selector: 'app-lecturer-workload-table',
    templateUrl: './lecturer-workload-table.component.html',
    styleUrls: ['./lecturer-workload-table.component.scss']
})
export class LecturerWorkloadTableComponent implements OnInit {

    @Input() lecturerWorkloadData: lecturer_load[] = []
    displayedColumns: string[] = [];
    @Input() type: 'all' | 'supervisor' | 'marker' = 'all';

    constructor(
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    viewAssignment(assignment_id: number) {
        this._router.navigate([`/assignment/view/${assignment_id}`], { relativeTo: this._route });
    }
    ngOnInit(): void {
        switch (this.type) {
            case 'all':
                this.displayedColumns = [
                    'student_name',
                    'intake_name',
                    'assignment_title',
                    'view_assignment',
                    'ppf_completed',
                    'ppf_approved',
                    'psf_completed',
                    'psf_approved',
                    'ir',
                    'final'
                ]
                break;
            case 'supervisor':
                this.displayedColumns = [
                    'student_name',
                    'intake_name',
                    'assignment_title',
                    'view_assignment',
                    'ppf_completed',
                    'ppf_approved',
                    'psf_approved',
                    'ir',
                    'final'
                ]
                break;
            case 'marker':
                this.displayedColumns = [
                    'student_name',
                    'intake_name',
                    'assignment_title',
                    'view_assignment',
                    'ppf_approved',
                    'psf_completed',
                    'psf_approved',
                    'ir',
                    'final'
                ]
                break;
        }
    }

}
