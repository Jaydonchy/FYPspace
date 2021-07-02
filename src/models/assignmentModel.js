const db = require('../Helper/knex-connection');

module.exports = {
    selectAllAssignments,
    selectAllAssignmentFields,
    selectAllSupervisoryLoad,
    selectAllMarkerLoad,
};

async function selectAllAssignments() {
    try {
        const res = await db.select()
            .from('assignment')
            .orderBy('id', 'asc');
        return res;
    } catch (error) {
        throw error;
    }
}

async function selectAllAssignmentFields() {
    try {
        const res = await db.select('assignment_field.assignment_id', 'assignment_field.field_id', 'field.name as field_name')
            .from('assignment_field')
            .innerJoin('field', 'assignment_field.field_id', 'field.id');
        return res;
    } catch (error) {
        throw error;
    }
}

async function selectAllSupervisoryLoad() {
    try {
        const res = await db.select('supervisor_id')
            .count('supervisor_id as load_count')
            .from('assignment')
            .groupBy('supervisor_id');
        return res;
    } catch (error) {
        throw error;
    }
}

async function selectAllMarkerLoad() {
    try {
        const res = await db.select('marker_id')
            .count('marker_id as load_count')
            .from('assignment')
            .groupBy('marker_id');
        return res;
    } catch (error) {
        throw error;
    }
}