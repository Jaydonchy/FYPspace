import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { LecturerService } from 'src/app/services/lecturer.service';
import { StudentService } from 'src/app/services/student.service';
import { Observable, Subject, } from 'rxjs';
import { student_item, lecturer_item, filterConfig, filterOption } from '../../interfaces/list';
import { MatchingService } from 'src/app/services/matching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-matching',
    templateUrl: './matching.component.html',
    styleUrls: ['./matching.component.scss']
})

export class MatchingComponent implements OnInit {

    constructor(
        public _user: UserService,
        public _student: StudentService,
        public _lecturer: LecturerService,
        public _matching: MatchingService,
        private _api: BackendService,
        public _snackbar: MatSnackBar,
        private router: Router,
    ) { }

    studentItems$?: Observable<student_item[]>;
    lecturerItems$?: Observable<lecturer_item[]>;
    //Buttons
    showCancelBtn = false;
    showSupervisorBtn = false;
    showMarkerBtn = false;
    showDeAssignSupervisor = false;
    showDeAssignMarker = false;
    //Search
    student_SearchString = '';
    lecturer_SearchString = '';
    //Filter
    student_Filter: filterConfig[] = [];
    lecturer_Filter: filterConfig[] = [];

    createFilterConfig(filter_name: string, keyPath: string, filterOptions: filterOption[]): filterConfig {
        return {
            filter_name: filter_name,
            keyPath: keyPath,
            filterOptions: filterOptions,
        }
    }

    createFilterOption(value: string | number, disp: string): filterOption {
        return {
            value: value,
            disp: disp,
            enabled: false,
        }
    }

    getFilterConfig() {
        const schools = new Promise<filterConfig>(resolve => {
            this._user.getSchools().then(async obs => {
                obs.subscribe(schools => {
                    const filterOptions = schools.map(school => {
                        const { id, name } = school;
                        return this.createFilterOption(id, name);
                    });
                    resolve(this.createFilterConfig('Schools', 'user.school_id', filterOptions));
                })
            })
        })

        const campus = new Promise<filterConfig>(resolve => {
            this._user.getCampus().then(obs => {
                obs.subscribe(campus => {
                    const filterOptions = campus.map(camp => {
                        const { id, name } = camp;
                        return this.createFilterOption(id, name);
                    });
                    resolve(this.createFilterConfig('Campus', 'user.campus_id', filterOptions));
                })
            })
        });

        const courses = new Promise<filterConfig>(resolve => {
            this._student.getCourses().then(obs => {

                obs.subscribe(course => {
                    const filterOptions = course.map(course => {
                        const { id, name } = course;
                        return this.createFilterOption(id, name);
                    })
                    resolve(this.createFilterConfig('Courses', 'student.course_id', filterOptions));
                })
            })
        });

        const intakes = new Promise<filterConfig>(resolve => {
            this._student.getIntakes().then(obs => {
                obs.subscribe(intakes => {
                    const filterOptions = intakes.map(intake => {
                        const { id, name } = intake
                        return this.createFilterOption(id, name);
                    })
                    resolve(this.createFilterConfig('Intakes', 'student.intake_id', filterOptions));
                })
            })
        });

        const departments = new Promise<filterConfig>(resolve => {
            this._lecturer.getDepartments().then(obs => {
                obs.subscribe(departments => {
                    const filterOptions = departments.map(department => {
                        const { id, name } = department
                        return this.createFilterOption(id, name);
                    })
                    resolve(this.createFilterConfig('Departments', 'lecturer.department_id', filterOptions));
                })
            })
        });

        const positions = new Promise<filterConfig>(resolve => {
            this._lecturer.getPositions().then(obs => {
                obs.subscribe(positions => {
                    const filterOptions = positions.map(position => {
                        const { id, name } = position
                        return this.createFilterOption(id, name);
                    })
                    resolve(this.createFilterConfig('Positions', 'lecturer.position_id', filterOptions));
                })
            })
        });

        const locations = new Promise<filterConfig>(resolve => {
            this._lecturer.getLocations().then(obs => {
                obs.subscribe(locations => {
                    const filterOptions = locations.map(location => {
                        const { id, name } = location
                        return this.createFilterOption(id, name);
                    })
                    resolve(this.createFilterConfig('Location', 'lecturer.location_id', filterOptions));
                })
            })
        });

        return Promise.all([schools, campus, courses, intakes, departments, positions, locations]);
    }

    getModel() {
        this._api.doGet<student_item[]>('/student/item/all').then(
            res => this.studentItems$ = res
        )

        this._api.doGet<lecturer_item[]>('/lecturer/item/all').then(
            res => this.lecturerItems$ = res
        )
    }

    selectStudent(item: student_item) {
        this._matching.selectedStudent = item.user.user_id == this._matching.selectedStudent?.user?.user_id ?
            undefined : item;
        this.doCheck();
    }

    selectLecturer(item: lecturer_item) {
        this._matching.selectedLecturer = item.user.user_id == this._matching.selectedLecturer?.user?.user_id ?
            undefined : item;
        this.doCheck()
    }

    //Toolbar button logic
    doCheck() {
        if (this._matching.selectedLecturer && this._matching.selectedStudent) {
            this.showSupervisorBtn = true;
            this.showMarkerBtn = true;
            this.showCancelBtn = true;
        }
        else if (this._matching.selectedLecturer || this._matching.selectedStudent) {
            this.showCancelBtn = true;
        }
        else if (!this._matching.selectedLecturer && !this._matching.selectedStudent) {
            this.showSupervisorBtn = false;
            this.showCancelBtn = false;
            this.showMarkerBtn = false;
        }
        //Deassignment option
        if (this._matching.selectedStudent) {

            this.showDeAssignMarker = this._matching.selectedStudent.assignment?.marker_id != null
                ? true
                : false;

            this.showDeAssignSupervisor = this._matching.selectedStudent.assignment?.supervisor_id != null
                ? true
                : false;
        } else {
            this.showDeAssignMarker = false;
            this.showDeAssignSupervisor = false;
        }
    }

    cancelSelection() {
        this._matching.selectedLecturer = undefined;
        this._matching.selectedStudent = undefined;
        this.doCheck();
    }

    refreshData() {
        this.getModel();
        this.cancelSelection();
    }

    async assignmentSubmit(isSupervisor: boolean, deAssignment: boolean = false) {
        const reqParam = this._matching.Assignment(isSupervisor, deAssignment);
        if (reqParam) {
            this._api.doPost('/assignment/update', reqParam).then(
                res => res.subscribe({
                    next: res => {
                        this._snackbar.open('Assignment Updated', '', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        return this.refreshData();
                    },
                    error: err => {
                        this._snackbar.open('Assignment Unsuccessful!', '', {
                            duration: 2500,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        })
                        console.log(err);
                    }

                })
            )
        } else {
            this._snackbar.open('Assignment Action Cancelled', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            })
        }
    }

    ngOnInit(): void {
        this.getModel();
        this.getFilterConfig().then(([schools, campus, courses, intakes, departments, positions, locations]) => {
            [schools, campus, courses, intakes].forEach(config => this.student_Filter.push(config));
            [schools, campus, departments, positions, locations].forEach(config => this.lecturer_Filter?.push(config));
        })
    }
}

