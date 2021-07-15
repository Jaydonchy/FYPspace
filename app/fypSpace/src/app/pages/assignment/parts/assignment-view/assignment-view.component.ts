import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { assignmentView } from 'src/app/interfaces/db_models';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    styleUrls: ['./assignment-view.component.scss']
})
export class AssignmentViewComponent implements OnInit {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _assignment: AssignmentService,
        private _auth: AuthService,
        private _api: BackendService
    ) { }

    assignmentView!: assignmentView;
    isSupervisor: boolean = false;
    isMarker: boolean = false;

    back() {
        this._router.navigate(['../../'], { relativeTo: this._route })
    }

    approvePPF() {
        this._api.doPost(`/assignment/ppf/approve`, { assignment_id: this.assignmentView.assignment_id }).then(res => {
            res.subscribe(q => {
                this.getAssignmentView();
            })
        });
    }

    approvePSF() {
        this._api.doPost(`/assignment/psf/approve`, { assignment_id: this.assignmentView.assignment_id }).then(res => {
            res.subscribe(q => {
                this.getAssignmentView();
            })
        });
    }

    getAssignmentView() {
        let assignment_id = this._route.snapshot.params.id;
        this._assignment.getAssignmentView(assignment_id).then(obs =>
            obs.subscribe(res => {
                this.assignmentView = res[0];
                if (this._auth.loggedInUser?.lecturer?.lecturer_id == this.assignmentView.supervisor.supervisor_id) {
                    this.isSupervisor = true;
                    this.isMarker = false;
                } else if (this._auth.loggedInUser?.lecturer?.lecturer_id == this.assignmentView.marker.marker_id) {
                    this.isMarker = true;
                    this.isSupervisor = false;
                }
                console.log(this.assignmentView)
                console.log(this.isMarker || this.assignmentView.ppf.approved)
                console.log(this.assignmentView.ppf.approved)
                console.log(this.isSupervisor||this.assignmentView.psf.approved)
                console.log(this.assignmentView.psf.approved)
            })
        )
    }

    ngOnInit(): void {
        this.getAssignmentView();

    }

}
