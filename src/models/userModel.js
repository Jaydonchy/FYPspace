const db = require('../Helper/knex-connection');

async function getLoginCredentials({ email_work, password }) {
    try {
        const res = await db
            .select()
            .from('user')
            .where({
                email_work: email_work,
                password: password,
            });
        return res;
    }catch(err){
        throw err;
    }
}

module.exports = {
    getLoginCredentials,
}
