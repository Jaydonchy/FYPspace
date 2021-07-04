import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { department, position, location, lecturer_simple } from '../interfaces/db_models';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class LecturerService {

    public departments!: department[];
    public positions!: position[];
    public locations!: location[];

    constructor(
        private _api: BackendService,
    ) {
        this.getDepartments().then(
            res => res.subscribe({
                next: departments => {
                    this.departments = departments;
                },
                error: err => {
                    console.log('error in retrieving Departments')
                }
            })
        )
        this.getPositions().then(
            res => res.subscribe({
                next: positions => {
                    this.positions = positions;
                },
                error: err => {
                    console.log('error in retrieving Positions')
                }
            })
        )
        this.getLocations().then(
            res => res.subscribe({
                next: locations => {
                    this.locations = locations;
                },
                error: err => {
                    console.log('error in retrieving locations')
                }
            })
        )

    }

    getDepartmentById(id: number) {
        return this.departments != undefined ? this.departments.find(department =>
            department.id == id
        )!.name : 'Loading';
    }

    getLocationById(id: number) {
        return this.locations != undefined ? this.locations.find(location =>
            location.id == id
        )!.name : 'Loading';
    }

    getPositionById(id: number) {
        return this.positions != undefined ? this.positions.find(position =>
            position.id == id
        )!.name : 'Loading';
    }


    getDepartments = async () => {
        return await this._api.doGet<department[]>('/lecturer/departments');
    }

    getLocations = async () => {
        return await this._api.doGet<location[]>('/lecturer/locations');
    }

    getPositions = async () => {
        return await this._api.doGet<position[]>('/lecturer/positions');
    }
}
