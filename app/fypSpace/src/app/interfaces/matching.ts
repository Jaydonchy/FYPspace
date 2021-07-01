import {user,student,lecturer} from "./db_models";

export interface student_item {
    user:user,
    student:student,
}

export interface lecturer_item {
    user:user,
    lecturer:lecturer,
}

