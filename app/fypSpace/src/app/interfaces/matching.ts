import {user,student,lecturer,lect_field, assignment} from "./db_models";

export interface student_item {
    user:user,
    student:student,
    assignment?:assignment,
}

export interface lecturer_item {
    user:user,
    lecturer:lecturer,
    lect_field?: lect_field[],
    supervisor_load: number,
    marker_load: number,
}

