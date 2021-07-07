import { user, student, lecturer, lect_field, assignment } from "./db_models";

export interface listable {
}

export interface student_item extends listable {
    user: user,
    student: student,
    assignment?: assignment,
}

export interface lecturer_item extends listable {
    user: user,
    lecturer: lecturer,
    lect_field?: lect_field[],
    supervisor_load: number,
    marker_load: number,
}

export interface filterConfig {
    filter_name: string,
    keyPath: string,
    filterOptions: filterOption[],
    type: 'select' | 'radio',
}


export interface filterOption {
    value: string | number,
    disp: string,
    enabled: boolean,
    filter_fn?:(arg:any)=> boolean;
}

 