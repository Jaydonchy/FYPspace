import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { assignmentView } from 'src/app/interfaces/db_models';
import { AssignmentService } from 'src/app/services/assignment.service';

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
    ) { }

    assignmentView!: assignmentView;

    back() {
        this._router.navigate(['../../'], { relativeTo: this._route })
    }

    ngOnInit(): void {
        let assignment_id = this._route.snapshot.params.id;
        this._assignment.getAssignmentView(assignment_id).then(obs =>
            obs.subscribe(res => {
                this.assignmentView = res[0];
            })
        )
    }

}
