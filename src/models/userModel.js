const db = require('../Helper/knex-connection');

async function getLoginCredentials({ email_work, password }) {
    const res = await db
        .select()
        .from('user')
        .where({
            email_work: email_work,
            password: password,
        });
    return res;
}

async function selectUserWhere(whereCondition){
    return await db
    .select()
    .from('user')
    .where(whereCondition);
}

async function insertNewUser(user){
    const [user_id] = await db('user').insert(user);
    return user_id;
}

module.exports = {
    getLoginCredentials,
    insertNewUser,
    selectUserWhere
}
