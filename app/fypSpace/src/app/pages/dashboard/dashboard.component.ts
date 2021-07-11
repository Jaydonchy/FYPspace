import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    username = ''
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        if (this._auth.loggedInUser) {
            this.username = this._auth.loggedInUser.user.fullname
            if (this._auth.loggedInUser.student) this._router.navigate(['student'], { relativeTo: this._route })
            else if (this._auth.loggedInUser.lecturer) this._router.navigate(['lecturer'], { relativeTo: this._route })
        }
        else {
            this._auth.logOut();
        }
    }

}
