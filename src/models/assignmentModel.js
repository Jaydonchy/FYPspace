const db = require('../Helper/knex-connection');

module.exports = {
    selectAllAssignments,
    selectAllAssignmentFields,
    updateLecturer,
    insertNewAssignment,
    selectAssignmentByLecturer,
    selectLecturerLoadById,
    selectMeetingLogsByLecturerId,
    selectAssignmentViewById,
};

async function selectAllAssignments() {
    const res = await db.select()
        .from('assignment')
        .orderBy('id', 'asc');
    return res;
}

async function selectAllAssignmentFields() {
    const res = await db.select('assignment_field.assignment_id', 'assignment_field.field_id', 'field.name as field_name')
        .from('assignment_field')
        .innerJoin('field', 'assignment_field.field_id', 'field.id');
    return res;
}

async function selectAssignment(student_id) {
    return await db('assignment')
        .select('*')
        .where('student_id', '=', student_id)
        .limit(1);
}

async function selectAssignmentByLecturer(lecturer_id) {
    return await db('assignment')
        .select(
            'id as assignment_id',
            'student_id',
            'title',
            'description',
            'supervisor_id',
            'marker_id',
            'ppf as ppf_id',
            'psf as psf_id',
            'ir',
            'final',
        )
        .where({ supervisor_id: lecturer_id })
        .whereOr({ marker_id: lecturer_id })
}

// SELECT a1.id,a1.title,
// a1.student_id,a2.fullname,a2.intake_id,a2.name AS intake_name,
// a1.supervisor_id,a1.marker_id, 
// a1.ppf,ppf.completed AS ppf_completd,ppf.approved AS ppf_approved, a2.ppf_submission, 
// a1.psf,psf.completed AS psf_completed,psf.approved AS psf_approved,a2.psf_submission,
// a1.ir,a2.ir_submission,
// a1.final,a2.final_submission
// FROM assignment AS a1
// LEFT JOIN (
// SELECT student.id AS student_id,user.fullname,student.intake_id,ass.id AS assignment_id, ass.title,intake.name,intake.ppf_submission,intake.psf_submission,intake.ir_submission,intake.final_submission
// FROM student 
// INNER JOIN assignment as ass ON ass.student_id = student.id
// LEFT JOIN user ON user.id = student.user_id
// LEFT JOIN intake ON student.intake_id = intake.id
// ) AS a2 ON a1.id = a2.assignment_id
// LEFT JOIN proposal_form AS ppf ON a1.ppf = ppf.id
// LEFT JOIN specification_form AS psf ON a1.psf = psf.id


async function selectLecturerLoadById(lecturer_id) {
    return await db.select(
        'a1.id as assignment_id', 'a1.title as assignment_title',
        'a1.student_id', 'a2.fullname',
        'a2.intake_id', 'a2.name AS intake_name',
        'a1.supervisor_id', 'a1.marker_id',
        'a1.ppf as ppf_id', 'ppf.completed AS ppf_completed', 'ppf.approved AS ppf_approved', ' a2.ppf_submission',
        'a1.psf as psf_id', 'psf.completed AS psf_completed', 'psf.approved AS psf_approved', 'a2.psf_submission',
        'a1.ir', 'a2.ir_submission',
        'a1.final', 'a2.final_submission'
    ).from('assignment as a1')
        .leftJoin(
            db.select(
                'student.id AS student_id',
                'user.fullname',
                'student.intake_id',
                'ass.id AS assignment_id',
                'ass.title',
                'intake.name',
                'intake.ppf_submission',
                'intake.psf_submission',
                'intake.ir_submission',
                'intake.final_submission'
            ).from('student')
                .innerJoin('assignment as ass', 'ass.student_id', 'student.id')
                .leftJoin('user', 'user.id', 'student.user_id')
                .leftJoin('intake', 'student.intake_id', 'intake.id')
                .as('a2'),
            'a1.id',
            'a2.assignment_id'
        )
        .leftJoin('proposal_form as ppf', 'a1.ppf', 'ppf.id')
        .leftJoin('specification_form as psf', 'a1.psf', 'psf.id')
        .where({ 'a1.supervisor_id': lecturer_id }).orWhere({ 'a1.marker_id': lecturer_id })
}

// SELECT 
// meeting.id AS meeting_id, meeting.assignment_id AS assignment_id, 
// meeting.visible,meeting.timing,
// meeting.items,meeting.record,meeting.action,
// meeting.approved,
// a1.student_id, a1.fullname,
// a1.supervisor_id,a1.marker_id,a1.assignment_title
// FROM meeting_log AS meeting
// LEFT JOIN (
// 	SELECT studentUser.student_id, studentUser.fullname,a2.id AS assignment_id,a2.supervisor_id, a2.marker_id, a2.title AS assignment_title
// 	FROM assignment AS a2
// 	LEFT JOIN (
// 		SELECT student.id AS student_id, user.fullname 
// 		FROM student 
// 		INNER JOIN user 
// 		ON student.user_id = user.id
// 	) AS studentUser
// 	ON studentUser.student_id = a2.student_id
// ) AS a1
// ON meeting.assignment_id = a1.assignment_id
// WHERE a1.supervisor_id = 2

async function selectMeetingLogsByLecturerId(lecturer_id) {
    return await db
        .select(
            'meeting.id AS meeting_id', ' meeting.assignment_id AS assignment_id',
            'meeting.visible', 'meeting.timing',
            'meeting.items', 'meeting.record', 'meeting.action',
            'meeting.approved',
            'a1.student_id', 'a1.fullname',
            'a1.supervisor_id', 'a1.marker_id', 'a1.assignment_title'
        )
        .from('meeting_log AS meeting')
        .leftJoin(
            db.select(
                'studentUser.student_id', 'studentUser.fullname', 'a2.id AS assignment_id', 'a2.supervisor_id', 'a2.marker_id', 'a2.title AS assignment_title'
            ).from('assignment as a2')
                .leftJoin(
                    db.select('student.id as student_id', 'user.fullname')
                        .from('student')
                        .innerJoin('user', 'student.user_id', 'user.id')
                        .as('studentUser'),
                    'studentUser.student_id', 'a2.student_id'
                ).as('a1'),
            'meeting.assignment_id',
            'a1.assignment_id'
        ).where({ 'a1.supervisor_id': lecturer_id })
}

// SELECT 
// a1.id AS assignment_id,
// studentUser.user_id, studentUser.student_id, studentUser.fullname, studentUser.tp_number,
// studentUser.course_id, studentUser.course_name,
// studentUser.intake_id, studentUser. intake_name,
// studentUser.ppf_submission, studentUser.psf_submission, studentUser.ir_submission, studentUser.final_submission,
// a1.title, a1.description,
// a1.supervisor_id, lecturerUser1.fullname AS supervisor_name,
// a1.marker_id, lecturerUser2.fullname AS marker_name,
// a1.ppf AS ppf_id,ppf.*, 
// a1.psf AS psf_id,psf.*
// FROM assignment AS a1
// LEFT JOIN (
// 	SELECT 
// 	 student.id AS student_id, student.tp_number, 
// 	 user.id AS user_id, user.fullname, 
// 	 student.course_id,course.name AS course_name,
// 	 intake.id AS intake_id,intake.name AS intake_name , 
// 	 intake.ppf_submission, intake.psf_submission, intake.ir_submission,intake.final_submission
// 	 FROM student 
// 	 INNER JOIN user ON student.user_id = user.id
// 	 LEFT JOIN intake ON student.intake_id = intake.id
// 	 LEFT JOIN course ON student.course_id = course.id
// ) AS studentUser
//  ON a1.student_id = studentUser.student_id
//  LEFT JOIN (
//  	SELECT lecturer.id AS lecturer_id, lecturer.user_id AS user_id, user.fullname
//  	FROM lecturer
//  	INNER JOIN user ON lecturer.user_id = user.id
//  ) AS lecturerUser1
//  ON a1.supervisor_id = lecturerUser1.lecturer_id
//   LEFT JOIN (
//  	SELECT lecturer.id AS lecturer_id, lecturer.user_id AS user_id, user.fullname
//  	FROM lecturer
//  	INNER JOIN user ON lecturer.user_id = user.id
//  ) AS lecturerUser2
//  ON a1.marker_id = lecturerUser2.lecturer_id
//  LEFT JOIN proposal_form AS ppf ON a1.ppf = ppf.id
//  LEFT JOIN specification_form AS psf ON a1.psf = psf.id
//  WHERE a1.id = 3

async function selectAssignmentViewById(assignment_id) {
    return await db
        .select(
            'a1.id AS assignment_id',
            'studentUser.user_id', 'studentUser.student_id', 'studentUser.fullname', 'studentUser.tp_number',
            'studentUser.course_id', 'studentUser.course_name',
            'studentUser.intake_id', 'studentUser.intake_name',
            'studentUser.ppf_submission', 'studentUser.psf_submission', ' studentUser.ir_submission', ' studentUser.final_submission',
            'a1.title', 'a1.description',
            'a1.supervisor_id', 'lecturerUser1.fullname AS supervisor_name',
            'a1.marker_id', 'lecturerUser2.fullname AS marker_name',
            'a1.ppf AS ppf_id', `ppf.*`,
            'a1.psf AS psf_id', `psf.*`
        )
        .from('assignment as a1')
        .leftJoin(
            db.select(
                ' student.id AS student_id', 'student.tp_number',
                'user.id AS user_id', 'user.fullname',
                'student.course_id', 'course.name AS course_name',
                'intake.id AS intake_id', 'intake.name AS intake_name',
                'intake.ppf_submission', 'intake.psf_submission', 'intake.ir_submission', 'intake.final_submission'
            )
                .from('student')
                .innerJoin('user', 'student.user_id', 'user.id')
                .leftJoin('intake', 'student.intake_id', 'intake.id')
                .leftJoin('course', 'student.course_id', 'course.id')
                .as('studentUser'),
            'a1.student_id',
            'studentUser.student_id'
        )
        .leftJoin(
            db.select(
                'lecturer.id as lecturer_id',
                'lecturer.user_id as user_id',
                'user.fullname'
            ).from('lecturer')
                .innerJoin('user', 'lecturer.user_id', 'user.id')
                .as('lecturerUser1'),
            'a1.supervisor_id',
            'lecturerUser1.lecturer_id'
        )
        .leftJoin(
            db.select(
                'lecturer.id as lecturer_id',
                'lecturer.user_id as user_id',
                'user.fullname'
            ).from('lecturer')
                .innerJoin('user', 'lecturer.user_id', 'user.id')
                .as('lecturerUser2'),
            'a1.marker_id',
            'lecturerUser2.lecturer_id'
        )
        .leftJoin('proposal_form as ppf', 'a1.ppf', 'ppf.id')
        .leftJoin('specification_form as psf', 'a1.psf', 'psf.id')
        .where({ 'a1.id': assignment_id })
}




async function insertDocuments() {
    const ppf = db('proposal_form')
        .insert({});
    const psf = db('specification_form')
        .insert({});
    return Promise.all([ppf, psf])
        .then(([[ppf_id], [psf_id]]) => {
            return [ppf_id, psf_id];
        });
}

async function insertNewAssignment(student_id) {
    const [ppf, psf] = await insertDocuments();
    const res = await db('assignment')
        .insert(
            {
                student_id: student_id,
                ppf: ppf,
                psf: psf
            })
    return res;
}

async function updateLecturer(newAssignment) {
    //Check if assignment exists
    //Assumption: Student Id Exists
    const { student_id } = newAssignment;

    await selectAssignment(student_id)
        .then(async assignmentExist => {
            if (assignmentExist.length < 1) {
                await insertNewAssignment(student_id)
                    .catch(err => { throw err });
            }
        })

    //Update Records
    //Assumption : Update query sent regardless if assignment for student exist or not
    const res = await db('assignment')
        .where('student_id', '=', student_id)
        .update(newAssignment)
    return res;
}


