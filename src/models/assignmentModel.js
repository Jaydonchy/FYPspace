const db = require('../Helper/knex-connection');

module.exports = {
    selectAllAssignments,
    selectAllAssignmentFields,
    updateLecturer,
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

async function selectAssignment(student_id) {
    return await db('assignment')
        .select('*')
        .where('student_id', '=', student_id)
        .limit(1);
}

async function insertDocuments() {
    const ppf = db('proposal_form')
        .insert({});
    const psf = db('specification_form')
        .insert({});
    return Promise.all([ppf, psf])
        .then(([[ppf_id], [psf_id]]) => {
            return [ppf_id, psf_id];
        });
}

async function insertNewAssignment(student_id) {
    const [ppf, psf] = await insertDocuments();
    const res = await db('assignment')
        .insert(
            {
                student_id: student_id,
                ppf: ppf,
                psf: psf
            })
    return res;
}

async function updateLecturer(newAssignment) {
    //Check if assignment exists
    //Assumption: Student Id Exists
    const { student_id } = newAssignment;

    await selectAssignment(student_id)
        .then(async assignmentExist => {
            if (assignmentExist.length < 1) {
                await insertNewAssignment(student_id)
                    .catch(err => { throw err });
            }
        })

    //Update Records
    //Assumption : Update query sent regardless if assignment for student exist or not
    const res = await db('assignment')
        .where('student_id', '=', student_id)
        .update(newAssignment)
    return res;
}


