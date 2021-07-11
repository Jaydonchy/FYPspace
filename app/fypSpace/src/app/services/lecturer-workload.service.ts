import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { lecturer_load, lecturer_meeting } from '../interfaces/table';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class LecturerWorkloadService {

    _lecturerWorkload$ = new BehaviorSubject<lecturer_load[]>([]);
    lecturerWorkload$?: Observable<lecturer_load[]>;

    _lecturerMeeting$ = new BehaviorSubject<lecturer_meeting[]>([]);
    lecturerMeeting$?: Observable<lecturer_meeting[]>;
    constructor(
        private _api: BackendService,
    ) {
        this.lecturerWorkload$ = this._lecturerWorkload$.asObservable();
        this.lecturerMeeting$ = this._lecturerMeeting$.asObservable();
    }

    getLecturerWorkload = (lecturer_id: number) => {
        this._api.doGet<lecturer_load[]>(`/lecturer/workload/${lecturer_id}`).then(obs => {
            obs.subscribe(res => this._lecturerWorkload$.next(res));
        })
    }

    getLecturerMeetings = (lecturer_id: number) => {
        this._api.doGet<lecturer_meeting[]>(`/lecturer/meetings/${lecturer_id}`).then(obs => {
            obs.subscribe(res => this._lecturerMeeting$.next(res));
        })
    }
}
