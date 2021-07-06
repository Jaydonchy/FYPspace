import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { student_item, lecturer_item } from '../interfaces/list';
import { BackendService } from './backend.service';
import { LecturerService } from './lecturer.service';

@Injectable({
    providedIn: 'root'
})
export class MatchingService {
    selectedLecturer?: lecturer_item;
    selectedStudent?: student_item;
    constructor(
        private _api: BackendService,
    ) { }



    checkIfLecturerAssigned(studentItem: student_item, lecturerItem: lecturer_item) {
        const { assignment } = studentItem;
        const { lecturer } = lecturerItem;
        return assignment?.supervisor_id == lecturer.lecturer_id || assignment?.marker_id == lecturer.lecturer_id ? true : false;
    }


    deAssignment(studentItem: student_item, isSupervisor: boolean) {
        const { student, assignment } = studentItem;
        if (isSupervisor) {
            return {
                student_id: student.student_id,
                supervisor_id: null
            }
        } else {
            return {
                student_id: student.student_id,
                marker_id: null,
            }
        }
    }

    //Refactor in the future
    AssignLecturer(studentItem: student_item, lecturerItem: lecturer_item, isSupervisor: boolean = false) {
        const { user: s_user, student, assignment } = studentItem;
        const { user: l_user, lecturer } = lecturerItem;
        let student_id = student.student_id;
        const assigned = this.checkIfLecturerAssigned(studentItem, lecturerItem);
        if (isSupervisor) {
            //Assignment logic for supervisor
            if (!assignment?.supervisor_id && !assigned) {
                return {
                    student_id: student_id,
                    supervisor_id: lecturer.lecturer_id
                }
            }
            else if (assignment?.supervisor_id && !assigned) {
                if (confirm(`Student already has supervisor assigned, confirm overwrite?`)) {
                    return {
                        student_id: student_id,
                        supervisor_id: lecturer.lecturer_id,
                    }
                } else return null;
            }
            else if (!assignment?.supervisor_id && assigned) {
                if (confirm('Lecturer is already assigned to student as 2nd marker, confirm swap to supervisor')) {
                    return {
                        student_id: student_id,
                        supervisor_id: lecturer.lecturer_id,
                        marker_id: null
                    }
                } else return null;
            }
            else if (assignment?.supervisor_id && assigned) {
                //If the selected supervisor is same as current supervisor do nothing
                //else swap
                if (assignment?.marker_id == lecturer.lecturer_id) {
                    if (confirm('Lecturer is already assigned to student as 2nd marker, confirm swap to supervisor(Current supervisor will be deassigned)')) {

                        return {
                            student_id: student_id,
                            supervisor_id: lecturer.lecturer_id,
                            marker_id: null,
                        }
                    } else return null;
                } else {
                    return {
                        student_id: student_id,
                        supervisor_id: lecturer.lecturer_id,
                    };
                }
            }
        } else {
            // Assignment Logic for 2nd Marker
            if (!assignment?.marker_id && !assigned) {
                return {
                    student_id: student_id,
                    marker_id: lecturer.lecturer_id
                }
            }
            else if (assignment?.marker_id && !assigned) {
                if (confirm(`Student already has marker assigned, confirm overwrite?`)) {
                    return {
                        student_id: student_id,
                        marker: lecturer.lecturer_id,
                    }
                } else return null;
            }
            else if (!assignment?.marker_id && assigned) {
                if (confirm('Lecturer is already assigned to student as supervisor, confirm swap to 2nd marker')) {
                    return {
                        student_id: student_id,
                        marker_id: lecturer.lecturer_id,
                        supervisor_id: null
                    }
                } else return null;
            }
            else if (assignment?.marker_id && assigned) {
                //If the selected supervisor is same as current supervisor do nothing
                //else swap
                if (assignment?.supervisor_id == lecturer.lecturer_id) {
                    if (confirm('Lecturer is already assigned to student as supervisor, confirm swap to 2nd marker(Current 2nd marker will be deassigned)')) {
                        return {
                            student_id: student_id,
                            marker_id: lecturer.lecturer_id,
                            supervisor_id: null,
                        }
                    } else return null;
                } else {
                    return {
                        student_id: student_id,
                        marker_id: lecturer.lecturer_id,
                    }
                }
            }
        }
        return null;
    }


    Assignment(isSupervisor: boolean, deAssignment: boolean = false) {
        //Is not selected
        if (!this.selectedStudent) return;
        //DeAssignment
        if (deAssignment) {
            return this.deAssignment(this.selectedStudent, isSupervisor);
        } else {
            if (!this.selectedLecturer) return;
            return this.AssignLecturer(this.selectedStudent, this.selectedLecturer, isSupervisor)
        }

    }

}

