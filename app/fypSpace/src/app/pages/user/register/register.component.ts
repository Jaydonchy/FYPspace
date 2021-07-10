import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { course, study_level, school, campus, intake } from '../../../interfaces/db_models';
import { BackendService } from '../../../services/backend.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(
        private _fb: FormBuilder,
        private _api: BackendService,
        private _user: UserService,
        private _student: StudentService,
        private route: ActivatedRoute,
        private router: Router,
        private _snackbar: MatSnackBar,
    ) { }

    formSubmitting = false;
    intakes$?: Observable<intake[]>;
    study_levels$?: Observable<study_level[]>;
    schools$?: Observable<school[]>
    campus$?: Observable<campus[]>
    courses$?: Observable<course[]>
    submitPath!:string;
    categories = [
        {
            bool_val: 0,
            title: 'Full Time'
        },
        {
            bool_val: 1,
            title: 'Part Time'
        },
    ]


    register_form = this._fb.group({
        tp_number: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]],
        fullname: ['', [Validators.required]],
        level_of_study: ['', [Validators.required]],
        intake_id: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(5)]],
        school_id: ['', Validators.required],
        email_work: ['', [Validators.email, Validators.required]],
        email_personal: [''],
        contact_no: [''],
        campus_id: ['', Validators.required],
        is_full_time: ['', Validators.required],
        course_id: ['', Validators.required],
    });

    formFieldModels = () => {
        this._user.getSchools().then(
            res => this.schools$ = res
        );
        this._user.getCampus().then(
            res => this.campus$ = res
        );
        this._student.getIntakes().then(
            res => this.intakes$ = res
        );
        this._student.getStudyLevels().then(
            res => this.study_levels$ = res
        );
        this._student.getCourses().then(
            res => this.courses$ = res
        );
    }

    ngOnInit(): void {
        this.formFieldModels();
    }

    onSubmit() {
        if (this.register_form.valid) {
            this.formSubmitting = true;
            this._api.doPost('/student/register', this.register_form.value).then(
                res => res.subscribe({
                    next: res => {
                        this._snackbar.open('Registration ', 'Successful!', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        this.formSubmitting = false;
                        this.router.navigate(['login']);
                    },
                    error: err => {
                        this._snackbar.open(`Registration Unsuccessful: ${err}`, '', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        this.formSubmitting = false;
                        console.log(err);
                    }

                })
            );
        } else {
            console.warn('Register form is not valid')
        }
    }

}
