const restructureStudentUser = ({
    student_id,
    user_id,
    level_of_study,
    course_id,
    intake_id,
    tp_number,
    fullname,
    email_work,
    email_personal,
    contact_no,
    school_id,
    campus_id,
    is_full_time,
}) => {
    return {
        user: {
            user_id: user_id,
            fullname: fullname,
            email_work: email_work,
            email_personal: email_personal,
            contact_no: contact_no,
            school_id: school_id,
            campus_id: campus_id,
            is_full_time: is_full_time,
        },
        student: {
            student_id: student_id,
            tp_number: tp_number,
            level_of_study: level_of_study,
            course_id: course_id,
            intake_id: intake_id,
        },
        assignment: {}
    }
}

const restructureAssignment = ({
    id,
    student_id,
    title,
    description,
    supervisor_id,
    marker_id,
    ppf,
    psf,
    ir,
    final }) => {
    return {
        assignment_id: id,
        student_id: student_id,
        title: title,
        description: description,
        supervisor_id: supervisor_id,
        marker_id: marker_id,
        ppf: ppf,
        psf: psf,
        ir: ir,
        final: final,
        assignment_fields: [],
    };
}

const restructureLecturerUser = ({
    lecturer_id,
    user_id,
    availability,
    is_pm,
    is_admin,
    location_id,
    position_id,
    department_id,
    fullname,
    email_work,
    email_personal,
    contact_no,
    school_id,
    campus_id,
    is_full_time,
}) => {
    return {
        user: {
            user_id: user_id,
            fullname: fullname,
            email_work: email_work,
            email_personal: email_personal,
            contact_no: contact_no,
            school_id: school_id,
            campus_id: campus_id,
            is_full_time: is_full_time,
        },
        lecturer: {
            lecturer_id: lecturer_id,
            availability: availability,
            is_pm: is_pm,
            is_admin: is_admin,
            location_id: location_id,
            position_id: position_id,
            department_id: department_id,
        },
        lect_field: [],
        supervisor_load: 0,
        marker_load: 0,
    }
}

const restructureLecturerWorkload = ({
    assignment_id, assignment_title,
    student_id, fullname,
    intake_id, intake_name,
    supervisor_id, marker_id,
    ppf_id, ppf_completed, ppf_approved, ppf_submission,
    psf_id, psf_completed, psf_approved, psf_submission,
    ir, ir_submission,
    final, final_submission
}) => {
    return {
        assignment: {
            assignment_id: assignment_id,
            assignment_title: assignment_title,
            supervisor_id: supervisor_id,
            marker_id: marker_id,
            ppf_id: ppf_id,
            ppf_completed: ppf_completed,
            ppf_approved: ppf_approved,
            psf_id: psf_id,
            psf_completed: psf_completed,
            psf_approved: psf_approved,
            ir: ir,
            final: final,
        },
        student: {
            student_id: student_id,
            fullname: fullname
        },
        intake: {
            intake_id: intake_id,
            intake_name: intake_name,
            ppf_submission: ppf_submission,
            psf_submission: psf_submission,
            ir_submission: ir_submission,
            final_submission: final_submission,
        }
    }
}

const restructureAssignmentView = ({
    assignment_id,
    user_id,
    student_id,
    fullname,
    tp_number,
    course_id,
    course_name,
    intake_id,
    intake_name,
    ppf_submission,
    psf_submission,
    ir_submission,
    final_submission,
    title,
    description,
    supervisor_id,
    supervisor_name,
    marker_id,
    marker_name,
    ppf_id,
    introduction,
    problem_statement,
    project_aim,
    project_obj,
    lit_review,
    deliverables,
    ppf_completed,
    ppf_approved,
    psf_id,
    project_background,
    project_objectives,
    resources,
    research,
    dev_plan,
    test_plan,
    psf_completed,
    psf_approved
}) => {
    return {
        assignment_id: assignment_id,
        assignment_title: title,
        assignment_description: description,
        student: {
            user_id: user_id,
            student_id: student_id,
            fullname: fullname,
            tp_number: tp_number,
        },
        course: {
            course_id: course_id,
            course_name: course_name
        },
        intake: {
            intake_id: intake_id,
            intake_name: intake_name,
            ppf_submission: ppf_submission,
            psf_submission: psf_submission,
            ir_submission: ir_submission,
            final_submission: final_submission,
        },
        supervisor: {
            supervisor_id: supervisor_id,
            supervisor_name: supervisor_name
        },
        marker: {
            marker_id: marker_id,
            marker_name: marker_name
        },
        ppf: {
            ppf_id: ppf_id,
            introduction: introduction,
            problem_statement: problem_statement,
            project_aim: project_aim,
            project_obj: project_obj,
            lit_review: lit_review,
            deliverables: deliverables,
            completed: ppf_completed,
            approved: ppf_approved,
        },
        psf: {
            psf_id: psf_id,
            project_background: project_background,
            project_objectives: project_objectives,
            resources: resources,
            research: research,
            dev_plan: dev_plan,
            test_plan: test_plan,
            completed: psf_completed,
            approved: psf_approved,
        }

    }

}

module.exports = {
    restructureStudentUser,
    restructureAssignment,
    restructureLecturerUser,
    restructureLecturerWorkload,
    restructureAssignmentView
}