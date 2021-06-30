import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }


    intakes$?: Observable<intake[]>;
    study_levels$?: Observable<study_level[]>;
    schools$?: Observable<school[]>
    campus$?: Observable<campus[]>
    courses$?: Observable<course[]>
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
        full_name: [''],
        level_of_study: [''],
        intake_id: [''],
        password: [''],
        school_id: [''],
        email_work: [''],
        email_personal: [''],
        contact_no: [''],
        campus_id: [''],
        is_full_time: [''],
        course_id: [''],
        tp_number: ['']
    });

    public loginInvalid?: boolean;
    private formSubmitAttempt?: boolean;
    private returnUrl?: string;

    formFieldModels = () => {
        this.intakes$ = this._api.doGet<intake[]>('/student/intakes');
        this.study_levels$ = this._api.doGet<study_level[]>('/student/study_level');
        this.schools$ = this._api.doGet<school[]>('/user/schools');
        this.campus$ = this._api.doGet<campus[]>('/user/campus');
        this.courses$ = this._api.doGet<course[]>('/student/courses');
    }

    ngOnInit(): void {
        this.formFieldModels();
    }

    onSubmit() {
        console.log(this.register_form.value);
    }

}
