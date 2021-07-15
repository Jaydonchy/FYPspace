import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { authUser } from '../interfaces/db_models';
import { lecturer_item, student_item } from '../interfaces/list';
import { BackendService } from './backend.service';
import { NavbarService } from './navbar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    loggedInUser?: authUser;
    loggedInUser$ = new Subject<any>();

    constructor(
        private _api: BackendService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _snackbar: MatSnackBar,
    ) {
        //Dev
        // this.loginPost({ email_work: "testLogin@staffmail", password: '12345678' }).then(res => {
        //     res.subscribe(user => { this.logIn(user[0]) })
        // })

    }

    refreshSessionUser() {
        this._api.doPost<authUser[]>('/user/login/refresh', { user_id: this.loggedInUser?.user.user_id })
            .then(res => res.subscribe(authUsers => this.loggedInUser = authUsers[0]))
    }

    loginPost = (form: { email_work: string, password: string }) => {
        return this._api.doPost<authUser[]>('/user/login', form)
    }

    logIn = (user: authUser) => {
        if (user.lecturer) this.loggedInUser = user as lecturer_item;
        else if (user.student) this.loggedInUser = user as student_item;
        this._router.navigate(['about']);
        this.loggedInUser$.next()
    }

    getPassword = () => {
        return this._api.doPost<string>('/user/getPassword', { user_id: this.loggedInUser?.user.user_id })
    }

    logOut = () => {
        this.loggedInUser = undefined;
        this.loggedInUser$.next();
        return this._router.navigate(['login']);
    }
}
