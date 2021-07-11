import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { student, study_level, course, intake } from '../interfaces/db_models';
import { student_item } from '../interfaces/list';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    intakes!: intake[];
    study_levels!: study_level[];
    courses!: course[];


    constructor(
        private _api: BackendService,
    ) {
        this.getIntakes().then(
            res => res.subscribe({
                next: intakes => {
                    this.intakes = intakes;
                },
                error: err => {
                    console.log('error in retrieving intake')
                }
            })
        )
        this.getStudyLevels().then(
            res => res.subscribe({
                next: study_levels => {
                    this.study_levels = study_levels;
                },
                error: err => {
                    console.log('error in retrieving study_level')
                }
            })
        )
        this.getCourses().then(
            res => res.subscribe({
                next: courses => {
                    this.courses = courses;
                },
                error: err => {
                    console.log('error in retrieving courses');
                }
            })
        )
    }

    getIntakeNameById(id: number) {
        return this.intakes != undefined ? this.intakes.find(intake =>
            intake.id == id
        )!.name : 'Loading';
    }

    getStudyLevelById(id: number) {
        return this.study_levels != undefined ? this.study_levels.find(study_level => {
            study_level.id == id;
        })!.name : 'Loading';
    }

    getCourseNameById(id: number) {
        return this.courses != undefined ? this.courses.find(course =>
            course.id == id
        )!.name : 'Loading';
    }

    getIntakes = async () => {
        const promise = await this._api.doGet<intake[]>('/student/intakes');
        return promise;
    }

    getStudyLevels = async () => {
        const promise = await this._api.doGet<study_level[]>('/student/study_level');
        return promise;
    }

    getCourses = async () => {
        const promise = await this._api.doGet<course[]>('/student/courses');
        return promise;
    }

    getStudentItems(){
        return this._api.doGet<student_item[]>('/student/item/all');   
    }
}
