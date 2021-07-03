export interface course {
    id: number,
    name: string,
}

export interface study_level {
    id: number,
    name: string,
}

export interface school {
    id: number,
    name: string,
    description: string,
}

export interface campus {
    id: number,
    name: string,
}

export interface intake {
    id: number,
    name: string,
    ppf_submission?: Date,
    psf_submission?: Date,
    ir_submission?: Date,
    created_at?: Date,
    deleted_at?: Date,
}

export interface user {
    user_id: number,
    fullname: string,
    email_work: string,
    email_personal: string,
    contact_no: string,
    school_id: number,
    campus_id: number,
    password?: string,
    is_full_time: boolean,
    is_active?: boolean,
    created_at?: Date,
    deleted_at?: Date,
}

export interface proposed_lecturer {
    lect_one: number | null,
    lect_two: number | null,
    lect_three: number | null,
    lect_four: number | null,
    lect_five: number | null,
}

export interface department {
    id: number,
    name: string,
}

export interface position {
    id: number,
    name: string,
}

export interface location {
    id: number,
    name: string,
}

export interface lect_field {
    field_id: number,
    field_name: string,
}

export interface student {
    tp_number: string,
    student_id: number,
    level_of_study: number,
    course_id: number,
    intake_id: number,
    proposed_lecturer?: proposed_lecturer[] | null,
}

export interface lecturer {
    lecturer_id: number,
    availability: boolean,
    is_pm: boolean,
    is_admin: boolean,
    position_id: number,
    department_id: number,
    location_id: number,
    lect_field?: lect_field[] | null,
}

export interface lecturer_simple {
    id: number,
    name: string,
}

export interface assignment_field {
    field_id: number,
    field_name: string,
}

export interface assignment {
    id: number,
    student_id: number,
    title: string,
    description: string,
    supervisor_id: lecturer_simple,
    marker_id: lecturer_simple,
    ppf: number,
    psf: number,
    ir: boolean,
    final: boolean,
    assignment_fields?: assignment_field[],
    created_at?: Date,
    deleted_at?: Date,
}