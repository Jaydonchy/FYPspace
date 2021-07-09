import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { LecturerService } from 'src/app/services/lecturer.service';
import { StudentService } from 'src/app/services/student.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { student_item, lecturer_item, filterConfig, filterOption, sortOption, user_item } from '../../interfaces/list';
import { MatchingService } from 'src/app/services/matching.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NullTemplateVisitor } from '@angular/compiler';


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

    private _studentItems$ = new BehaviorSubject<student_item[]>([]);
    studentItems$?: Observable<student_item[]>;

    lecturerItems$?: Observable<lecturer_item[]>;
    _lecturerItems$ = new BehaviorSubject<lecturer_item[]>([]);
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
    //Sorting
    student_SortOptions: sortOption[] = [];
    student_Sorter!: sortOption;
    student_Sorter_asc = true;
    lecturer_SortOptions: sortOption[] = [];
    lecturer_Sorter!: sortOption;
    lecturer_Sorter_asc = true;


    createSelectFilterConfig(filter_name: string, keyPath: string, filterOptions: filterOption[]): filterConfig {
        return {
            filter_name: filter_name,
            keyPath: keyPath,
            filterOptions: filterOptions,
            type: 'select',
        }
    }

    createRadioFilterConfig(filter_name: string, keyPath: string, filterOptions: filterOption[]): filterConfig {
        return {
            filter_name: filter_name,
            keyPath: keyPath,
            filterOptions: filterOptions,
            type: 'radio',
        }
    }

    createSelectFilterOption(value: string | number, disp: string): filterOption {
        return {
            value: value,
            disp: disp,
            enabled: false,
        }
    }

    createRadioFilterOption(disp: string, isDefault: boolean = false, callback: (arg: any) => boolean): filterOption {
        return {
            value: 0,
            disp: disp,
            enabled: isDefault,
            filter_fn: callback,
        }
    }

    createSortingOption<T>(disp: string, comparator: (o1: T, o2: T) => number): sortOption {
        return {
            disp: disp,
            comparator: comparator,
        }
    }

    generateFilterConfig() {
        const schools = new Promise<filterConfig>(resolve => {
            this._user.getSchools().then(async obs => {
                obs.subscribe(schools => {
                    const filterOptions = schools.map(school => {
                        const { id, name } = school;
                        return this.createSelectFilterOption(id, name);
                    });
                    resolve(this.createSelectFilterConfig('Schools', 'user.school_id', filterOptions));
                })
            })
        })

        const campus = new Promise<filterConfig>(resolve => {
            this._user.getCampus().then(obs => {
                obs.subscribe(campus => {
                    const filterOptions = campus.map(camp => {
                        const { id, name } = camp;
                        return this.createSelectFilterOption(id, name);
                    });
                    resolve(this.createSelectFilterConfig('Campus', 'user.campus_id', filterOptions));
                })
            })
        });

        const courses = new Promise<filterConfig>(resolve => {
            this._student.getCourses().then(obs => {

                obs.subscribe(course => {
                    const filterOptions = course.map(course => {
                        const { id, name } = course;
                        return this.createSelectFilterOption(id, name);
                    })
                    resolve(this.createSelectFilterConfig('Courses', 'student.course_id', filterOptions));
                })
            })
        });

        const intakes = new Promise<filterConfig>(resolve => {
            this._student.getIntakes().then(obs => {
                obs.subscribe(intakes => {
                    const filterOptions = intakes.map(intake => {
                        const { id, name } = intake
                        return this.createSelectFilterOption(id, name);
                    })
                    resolve(this.createSelectFilterConfig('Intakes', 'student.intake_id', filterOptions));
                })
            })
        });

        const departments = new Promise<filterConfig>(resolve => {
            this._lecturer.getDepartments().then(obs => {
                obs.subscribe(departments => {
                    const filterOptions = departments.map(department => {
                        const { id, name } = department
                        return this.createSelectFilterOption(id, name);
                    })
                    resolve(this.createSelectFilterConfig('Departments', 'lecturer.department_id', filterOptions));
                })
            })
        });

        const positions = new Promise<filterConfig>(resolve => {
            this._lecturer.getPositions().then(obs => {
                obs.subscribe(positions => {
                    const filterOptions = positions.map(position => {
                        const { id, name } = position
                        return this.createSelectFilterOption(id, name);
                    })
                    resolve(this.createSelectFilterConfig('Positions', 'lecturer.position_id', filterOptions));
                })
            })
        });

        const locations = new Promise<filterConfig>(resolve => {
            this._lecturer.getLocations().then(obs => {
                obs.subscribe(locations => {
                    const filterOptions = locations.map(location => {
                        const { id, name } = location
                        return this.createSelectFilterOption(id, name);
                    })
                    resolve(this.createSelectFilterConfig('Location', 'lecturer.location_id', filterOptions));
                })
            })
        });



        return Promise.all([schools, campus, courses, intakes, departments, positions, locations]);
    }


    generateStudentDisplayConfig() {
        const displayAll = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Display All', true, (item: student_item) => {
                return true;
            }))
        });
        const lecturerAssigned = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Supervisor and Marker Assigned', false, (item: student_item) => {
                return item.assignment?.supervisor_id && item.assignment.marker_id ? true : false
            }));
        })
        const lecturerUnassigned = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Supervisor and Marker Unassigned', false, (item: student_item) => {
                return !item.assignment?.supervisor_id && !item.assignment?.marker_id ? true : false
            }));
        })
        const markerAssigned = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Only Marker Assigned', false, (item: student_item) => {
                return !item.assignment?.supervisor_id && item.assignment?.marker_id ? true : false
            }));
        })
        const supervisorAssigned = new Promise(resolve => {
            resolve(
                this.createRadioFilterOption('Only Supervisor Assigned', false, (item: student_item) => {
                    return item.assignment?.supervisor_id && !item.assignment?.marker_id ? true : false
                }));
        })

        return Promise.all([displayAll, lecturerAssigned, lecturerUnassigned, markerAssigned, supervisorAssigned]).then((options) => {
            const option: filterOption[] = options.map(x => x as filterOption);
            return this.createRadioFilterConfig('Display', 'assignment', option);
        }
        )
    }

    generateLecturerAvailabilityConfig() {
        const displayAll = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Display All', true, (item: lecturer_item) => {
                return true;
            }))
        });
        const Available = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Only Available', false, (item: lecturer_item) => {
                return item.lecturer.availability == true;
            }))
        });
        const Unavailable = new Promise(resolve => {
            resolve(this.createRadioFilterOption('Only Unavailable', false, (item: lecturer_item) => {
                return item.lecturer.availability == false
            }))
        });

        return Promise.all([displayAll, Available, Unavailable]).then(options => {
            const option: filterOption[] = options.map(x => x as filterOption);
            return this.createRadioFilterConfig('Availability', 'lecturer.availability', option);
        })


    }

    getStudentItems() {
        this._student.getStudentItems().then(obs => {
            obs.subscribe(res => this._studentItems$.next(res));
        })
    }

    getLecturerItems() {
        this._lecturer.getLecturerItems().then(obs => {
            obs.subscribe(res => this._lecturerItems$.next(res));
        })
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

    generateUserSortingOption() {
        const isDefault = this.createSortingOption('Default', (o1: user_item, o2: user_item) => {
            return o1.user.user_id - o2.user.user_id;
        });
        const school = this.createSortingOption<user_item>('School', (o1: user_item, o2: user_item) => {
            return o1.user.school_id - o2.user.school_id;
        })
        const campus = this.createSortingOption<user_item>('Campus', (o1: user_item, o2: user_item) => {
            return o1.user.campus_id - o2.user.campus_id;
        })
        const fullname = this.createSortingOption<user_item>('Name', (o1: user_item, o2: user_item) => {
            return o1.user.fullname.localeCompare(o2.user.fullname, 'en', { sensitivity: 'base' })
        })

        return Promise.all([isDefault, school, campus, fullname])
    }

    generateStudentSortingOptions() {

        const tpnumber = this.createSortingOption<student_item>('TP Number', (o1: student_item, o2: student_item) => {
            return (+o1.student.tp_number) - (+o2.student.tp_number);
        })
        const course = this.createSortingOption<student_item>('Course', (o1: student_item, o2: student_item) => {
            return o1.student.course_id - o2.student.course_id
        })
        const intake = this.createSortingOption<student_item>('Intake', (o1: student_item, o2: student_item) => {
            return o1.student.intake_id - o2.student.intake_id
        })

        return Promise.all([tpnumber, course, intake])
    }

    generateLecturerSortingOptions() {
        const position = this.createSortingOption<lecturer_item>('position', (o1: lecturer_item, o2: lecturer_item) => {
            return o1.lecturer.position_id - o2.lecturer.position_id
        })
        const department = this.createSortingOption<lecturer_item>('department', (o1: lecturer_item, o2: lecturer_item) => {
            return o1.lecturer.department_id - o2.lecturer.department_id
        })
        const location = this.createSortingOption<lecturer_item>('location', (o1: lecturer_item, o2: lecturer_item) => {
            return o1.lecturer.location_id - o2.lecturer.location_id
        })

        return Promise.all([position,department,location])

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
        console.log(this.student_Sorter)
        this._matching.selectedLecturer = undefined;
        this._matching.selectedStudent = undefined;
        this.doCheck();
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
                        this.getStudentItems();
                        this.getLecturerItems();
                        this.cancelSelection();
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

        this.studentItems$ = this._studentItems$.asObservable();
        this.getStudentItems();
        this.lecturerItems$ = this._lecturerItems$.asObservable();
        this.getLecturerItems();

        this.generateFilterConfig().then(([schools, campus, courses, intakes, departments, positions, locations]) => {
            [schools, campus, courses, intakes].forEach(config => this.student_Filter.push(JSON.parse(JSON.stringify(config))));
            [schools, campus, departments, positions, locations].forEach(config => this.lecturer_Filter?.push(JSON.parse(JSON.stringify(config))));
            this.generateStudentDisplayConfig().then(res => this.student_Filter.push(res));
            this.generateLecturerAvailabilityConfig().then(res => this.lecturer_Filter.push(res));
        })

        this.generateUserSortingOption().then((userSortingOptions) => {
            userSortingOptions.forEach(option => {
                if(option.disp=="Default") {
                    this.student_Sorter = option;
                    this.lecturer_Sorter = option;
                }
                this.student_SortOptions.push(option);
                this.lecturer_SortOptions.push(option);
            })
        })

        this.generateStudentSortingOptions().then((studentSortingOptions) => {
            studentSortingOptions.forEach(option => {
                this.student_SortOptions.push(option);
            })
        })

        this.generateLecturerSortingOptions().then((lecturerSortingOptions)=>{
            lecturerSortingOptions.forEach(option=> {
                this.lecturer_SortOptions.push(option);
            })
        })
    }
}

