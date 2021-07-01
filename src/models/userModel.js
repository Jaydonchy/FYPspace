const db = require('../Helper/knex-connection');

async function getLoginCredentials({email_work, password}){
    const res = await db
    .select()
    .from('user')
    .where({
        email_work: email_work,
        password: password,
    });
    return res;
}

module.exports = {
    getLoginCredentials,
}
