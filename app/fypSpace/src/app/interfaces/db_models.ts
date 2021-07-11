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
   lecturer_id: number,
   lecturer_name: number,
   priority: number
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
    fullname: string,
}

export interface assignment_field {
    field_id: number,
    field_name: string,
}

export interface document {
    completed:boolean
    approved:boolean
}

export interface assignment {
    id: number,
    student_id: number,
    title: string,
    description: string,
    supervisor_id: number,
    marker_id: number,
    ppf: number,
    psf: number,
    ir: boolean,
    final: boolean,
    assignment_fields?: assignment_field[],
    created_at?: Date,
    deleted_at?: Date,
}

export interface authUser {
    user:user,
    lecturer?:lecturer,
    student?:student,
}


    export interface assignmentView{
        assignment_id: number,
        assignment_title: string,
        assignment_description: string,
        student: {
            user_id: number,
            student_id: number,
            fullname: string,
            tp_number: string,
        },
        course: {
            course_id: number,
            course_name: string
        },
        intake: {
            intake_id: number,
            intake_name: string,
            ppf_submission: Date,
            psf_submission: Date,
            ir_submission: Date,
            final_submission: Date,
        },
        supervisor: {
            supervisor_id: number,
            supervisor_name: string
        },
        marker: {
            marker_id: number,
            marker_name: string
        },
        ppf: {
            ppf_id: number,
            introduction: string,
            problem_statement: string,
            project_aim: string,
            project_obj: string,
            lit_review: string,
            deliverables: string,
            completed: boolean,
            approved: boolean,
        },
        psf: {
            psf_id: number,
            project_background: string,
            project_objectives: string,
            resources: string,
            research: string,
            dev_plan: string,
            test_plan: string
        }
    }
    
