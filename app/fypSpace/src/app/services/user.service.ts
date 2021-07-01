import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { school, campus } from '../interfaces/db_models';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public schools!: school[];
    public campus!: campus[];



    constructor(
        private _api: BackendService,
    ) {
        this.getSchools().then(
            res => res.subscribe({
                next: school => {
                    this.schools = school;
                },
                error: err => {
                    console.log('error in retrieving school')
                }
            })
        )
        this.getCampus().then(
            res => res.subscribe({
                next: campus => {
                    this.campus = campus;
                },
                error: err => {
                    console.log('error in retrieving campus')
                }
            })
        )
    }

    getSchoolNameById(id: number) {
        return this.campus != undefined ? this.schools.find(school =>
            school.id == id
        )!.name : 'Loading';
    }

    getCampusNameById(id: number) {
        return this.campus != undefined ? this.campus.find(camp =>
            camp.id == id
        )!.name : 'Loading';
    }

    getSchoolByIdTest = async (id: number) => {
        const promise = await this._api.doGet<school>(`/user/school/${id}`);
        return promise;
    }

    getSchools = async () => {
        const promise = await this._api.doGet<school[]>('/user/schools');
        return promise;
    }

    getCampus = async () => {
        const promise = await this._api.doGet<campus[]>('/user/campus');
        return promise;
    }
}