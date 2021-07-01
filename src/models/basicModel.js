const db = require('../Helper/knex-connection');

module.exports = {
    selectAll,
}
async function selectAll(tablename) {
    const res = await db
        .select()
        .from(tablename)
        .orderBy('id', 'asc');
    return res;
}