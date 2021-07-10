import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { course, study_level, school, campus, intake, position, department, location } from '../../../interfaces/db_models';
import { BackendService } from 'src/app/services/backend.service';
import { AuthService } from 'src/app/services/auth.service';
import { LecturerService } from 'src/app/services/lecturer.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    constructor(
        private _fb: FormBuilder,
        private _api: BackendService,
        private _user: UserService,
        private _student: StudentService,
        private _lecturer: LecturerService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _snackbar: MatSnackBar,
        public _auth: AuthService,
    ) { }

    formSubmitting = false;
    intakes$?: Observable<intake[]>;
    study_levels$?: Observable<study_level[]>;
    schools$?: Observable<school[]>
    campus$?: Observable<campus[]>
    courses$?: Observable<course[]>
    positions$?: Observable<position[]>
    departments$?: Observable<department[]>
    locations$?: Observable<location[]>
    categories = [
        {
            bool_val: 0,
            title: 'Part Time'
        },
        {
            bool_val: 1,
            title: 'Full Time'
        },
    ]
    apiUrl = "";

    edit_form = this._fb.group({
        user_id: ['', [Validators.required]],
        fullname: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        school_id: ['', Validators.required],
        campus_id: ['', Validators.required],
        email_work: ['', [Validators.email, Validators.required]],
        email_personal: [''],
        contact_no: [''],
        is_full_time: ['', Validators.required],
        //Student Exclusive
    });

    formFieldModels = () => {
        this._user.getSchools().then(
            res => this.schools$ = res
        );
        this._user.getCampus().then(
            res => this.campus$ = res
        );
        if (this._auth.loggedInUser?.student) {
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
        else if (this._auth.loggedInUser?.lecturer) {
            this._lecturer.getDepartments().then(
                res => this.departments$ = res
            )
            this._lecturer.getLocations().then(
                res => this.locations$ = res
            )
            this._lecturer.getPositions().then(
                res => this.positions$ = res
            )
        }
    }

    ngOnInit(): void {
        this.formFieldModels();
        const user = this._auth.loggedInUser;
        const pw = this._auth.getPassword().then(res => {
            res.subscribe(retrieved => {
                const { password } = (retrieved[0] as unknown) as { password: string };
                this.edit_form.patchValue({
                    password: password,
                })
            })
        })
        this.edit_form.patchValue({
            user_id: this._auth.loggedInUser?.user.user_id,
            fullname: user?.user.fullname,
            password: user?.user.password,
            school_id: user?.user.school_id,
            campus_id: user?.user.campus_id,
            email_work: user?.user.email_work,
            email_personal: user?.user.email_personal,
            contact_no: user?.user.contact_no,
            is_full_time: user?.user.is_full_time ? this.categories[1] : this.categories[0],
        })
        if (this._auth.loggedInUser?.student) {
            this.edit_form.addControl('student_id', this._fb.control(user?.student?.student_id, []));
            this.edit_form.addControl('tp_number', this._fb.control(user?.student?.tp_number, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]));
            this.edit_form.addControl('level_of_study', this._fb.control(user?.student?.level_of_study, [Validators.required]));
            this.edit_form.addControl('intake_id', this._fb.control(user?.student?.intake_id, [Validators.required]));
            this.edit_form.addControl('course_id', this._fb.control(user?.student?.course_id, [Validators.required]));
            this.apiUrl = "/student/profile/edit"
        }
        else if (this._auth.loggedInUser?.lecturer) {
            this.edit_form.addControl('lecturer_id', this._fb.control(user?.lecturer?.lecturer_id, []));
            this.edit_form.addControl('position_id', this._fb.control(user?.lecturer?.position_id, [Validators.required]))
            this.edit_form.addControl('location_id', this._fb.control(user?.lecturer?.location_id, [Validators.required]))
            this.edit_form.addControl('department_id', this._fb.control(user?.lecturer?.department_id, [Validators.required]))
            this.apiUrl = "/lecturer/profile/edit"
        }
    }

    onSubmit() {
        if (this.edit_form.valid) {
            this.formSubmitting = true;
            this._api.doPost(this.apiUrl, this.edit_form.value).then(
                res => res.subscribe({
                    next: res => {
                        this._snackbar.open('Registration ', 'Successful!', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        this.formSubmitting = false;
                        this._auth.refreshSessionUser();
                        this._router.navigate(['./'], { relativeTo: this._route });
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
