const db = require('../Helper/knex-connection');

module.exports = {
    addNewStudent,
}

async function addNewStudent({user,student}){
    try{
        const [user_id] = await db('user').insert(user);
        student.user_id = user_id;
        const [query_res] = await db('student').insert(student);
        return query_res;
    }catch(err){
        throw err;
    }
}