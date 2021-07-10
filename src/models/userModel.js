const db = require('../Helper/knex-connection');


async function selectUserWhere(whereCondition) {
    return await db
        .select()
        .from('user')
        .where(whereCondition);
}

async function selectUserTypeById(user_id){
    return await db
        .select('user.id as user_id', 'student.id as student_id', 'lecturer.id as lecturer_id')
        .from('user')
        .leftJoin('student', 'student.user_id', 'user.id')
        .leftJoin('lecturer', 'lecturer.user_id', 'user.id')
        .where({
            'user.id': user_id
        })
        .limit(1)
}

async function selectUserTypeAuth({ email_work, password }) {
    return await db
        .select('user.id', 'student.id as student_id', 'lecturer.id as lecturer_id')
        .from('user')
        .leftJoin('student', 'student.user_id', 'user.id')
        .leftJoin('lecturer', 'lecturer.user_id', 'user.id')
        .where({
            email_work: email_work,
            password: password
        })
        .limit(1)
}

async function selectPassword(user_id) {
    return await db
        .select('password')
        .from('user')
        .where({ id: user_id });
}

async function updateUser(user_id, updateObject) {
    return await db('user')
        .where({ id: user_id })
        .from('user')
        .update(updateObject);
}

async function insertNewUser(user) {
    const [user_id] = await db('user').insert(user);
    return user_id;
}

module.exports = {
    selectUserTypeAuth,
    insertNewUser,
    selectUserWhere,
    updateUser,
    selectPassword,
    selectUserTypeById
}
