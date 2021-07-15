import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lecturer_item, student_item } from 'src/app/interfaces/list';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formSubmitting = false;
    constructor(
        private _fb: FormBuilder,
        private _auth: AuthService,
        private _snackbar: MatSnackBar,
        private _router: Router,

    ) { }

    form = this._fb.group({
        email_work: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });;

    ngOnInit(): void {
        this._auth.logOut();
    }

    onSubmit() {
        if (this.form.valid) {
            this.formSubmitting = true;
            this._auth.loginPost(this.form.value).then(res => {
                res.subscribe({
                    next: res => {
                        if (res.length == 1) {
                            this._snackbar.open('Login Successful!', '', {
                                duration: 1500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top'
                            })
                            let [user] = res;
                            this._auth.logIn(user);
                            this.formSubmitting = false;
                        }
                        else {
                            this._snackbar.open('Wrong Credentials', '', {
                                duration: 1500,
                                horizontalPosition: 'center',
                                verticalPosition: 'top'
                            })
                            this.formSubmitting = false;
                        }
                    },
                    error: err => {
                        console.log(err);
                    }
                })
            });
        } else {
            this._snackbar.open('Form is not valid', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            })
            this.formSubmitting = false;
        }
    }

}
