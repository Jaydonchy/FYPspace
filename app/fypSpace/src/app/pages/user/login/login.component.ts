import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
        private _api: BackendService,
        private _auth: AuthService,

    ) { }

    form = this._fb.group({
        email_work: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });;

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.form.valid) {
            this.formSubmitting = true;
            this._auth.loginPost(this.form.value).then(
                res => res.subscribe({
                    next: res => {
                        this.formSubmitting = false;
                        const r = res as Array<Object>;
                        if (r.length == 1) {
                            console.log('Login Successful');
                            let [user] = r;
                            console.log(user);
                        }
                        else {
                            console.warn('Invalid Login Attempt');
                        }
                    },
                    error: err => {
                        console.log(err);
                    }

                })
            )

        } else {
            console.warn('Login form is not valid')
        }
    }

}
