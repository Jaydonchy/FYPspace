const db = require('../Helper/knex-connection');

module.exports = {
    selectAllAssignments,
    selectAllAssignmentFields,
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

