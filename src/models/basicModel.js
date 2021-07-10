const db = require('../Helper/knex-connection');

module.exports = {
    selectAll,
    selectOneById,
    selectAllByField,
    selectAllWhere
}

async function selectAll(tablename) {
    const res = await db
        .select()
        .from(tablename)
        .orderBy('id', 'asc');
    return res;
}

async function selectAllByField(tablename, fieldname) {
    const res = await db
        .select(fieldname)
        .from(tablename)
    return res;
}

async function selectAllWhere(tablename, whereCondition) {
    return await db
        .select()
        .from(tablename)
        .where(whereCondition);
}

async function selectOneById(tablename, id) {
    const res = await db
        .select()
        .from(tablename)
        .where({
            id: id,
        })
        .limit(1)
        .then(row => row[0]);
    return res;
}