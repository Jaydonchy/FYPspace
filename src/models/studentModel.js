const db = require('../Helper/knex-connection');

module.exports = {
    addNewStudent,
    selectAllStudentUser,
    selectProposedLecturerById,
}


async function addNewStudent({ user, student }) {

    const [user_id] = await db('user').insert(user);
    student.user_id = user_id;
    //Future: Create Assignment
    const [query_res] = await db('student').insert(student);
    return query_res;

}

async function selectAllStudentUser() {

    const res = await db
        .select(
            'student.id as student_id',
            'user.id as user_id',
            'level_of_study',
            'student.course_id',
            'student.intake_id',
            'student.tp_number',
            'user.fullname',
            'user.email_work',
            'user.email_personal',
            'user.contact_no',
            'user.school_id',
            'user.campus_id',
            'user.is_full_time',
        )
        .from('student')
        .innerJoin('user', 'student.user_id', 'user.id')
    return res;

}

// SELECT proposed.student_id, proposed.lecturer_id, lecturerUser.fullname AS lecturer_name, proposed.priority
// FROM proposed_lecturer AS proposed
// LEFT JOIN (
//     SELECT lecturer.id AS id,user.fullname AS fullname
//     FROM lecturer
//     LEFT JOIN user ON lecturer.user_id = user.id 
//     ) AS lecturerUser
// ON lecturerUser.id = proposed.lecturer_id
// WHERE
// ORDER BY proposed.student_id ASC, priority ASC

async function selectProposedLecturerById(id) {
    const res = await db.select(
        'proposed.student_id',
        'proposed.lecturer_id',
        'lecturerUser.fullname AS lecturer_name',
        'proposed.priority'
    ).from('proposed_lecturer AS proposed')
    .leftJoin(
        db.select('lecturer.id AS id', 'user.fullname AS fullname')
        .from('lecturer')
        .leftJoin('user','lecturer.user_id','user.id')
        .as('lecturerUser'),
        'lecturerUser.id',
        'proposed.lecturer_id'
    )
    .where({'proposed.student_id':id})
    .orderBy('proposed.student_id','asc')
    .orderBy('priority','asc');
    return res;
}

