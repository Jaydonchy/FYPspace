const db = require('../Helper/knex-connection');

module.exports = {
    addNewStudent,
    selectAllStudentUser,
}


async function addNewStudent({ user, student }) {

    const [user_id] = await db('user').insert(user);
    student.user_id = user_id;
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

