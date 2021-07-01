import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
        private route: ActivatedRoute,
        private router: Router,
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
            this._api.doPost('/user/login', this.form.value)
                .subscribe({
                    next: res => {
                        this.formSubmitting = false;
                        const r = res as Array<Object>;
                        if (r.length == 1) {
                            console.log('Login Successful');
                            let [user]= r;
                            console.log(user);
                        }
                        else {
                            console.log(r);
                            console.warn('Invalid Login Attempt');
                        }
                    },
                    error: err => {
                        console.log(err);
                    }

                });
        } else {
            console.warn('Login form is not valid')
        }
    }

}
