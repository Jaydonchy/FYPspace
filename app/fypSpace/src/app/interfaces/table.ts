import { assignment, intake, document } from './db_models';

export interface lecturer_load {
    assignment: {
        assignment_id: number,
        assignment_title: string,
        supervisor_id: number,
        marker_id: number,
        ppf_id: number,
        ppf_completed: boolean,
        ppf_approved: boolean,
        psf_id: number,
        psf_completed: boolean,
        psf_approved: boolean,
        ir: boolean,
        final: boolean
    },
    student: {
        student_id: number,
        fullname: string
    },
    intake: {
        intake_id: number,
        intake_name: string,
        ppf_submission: Date,
        psf_submission: Date,
        ir_submission: Date,
        final_submission: Date,
    }
}

export interface lecturer_meeting {
    meeting_id: number,
    assignment_id: number,
    visible: boolean,
    timing: Date,
    items: string,
    record: string,
    action: string,
    approved: boolean,
    student_id: number,
    fullname: string,
    supervisor_id: number,
    marker_id: number,
    assignment_title: string

}