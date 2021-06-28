import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    form = this.fb.group({
        username: '',
        password: ''
      });;
    public loginInvalid?: boolean;
    private formSubmitAttempt?: boolean;
    private returnUrl?: string;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    async onSubmit() {
        this.loginInvalid=false;
        this.formSubmitAttempt=false;
    }

}
