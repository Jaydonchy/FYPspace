const db = require('../Helper/knex-connection');

module.exports = {
    selectAllLecturerUser,
    selectLecturerUserById,
    selectAllLecturerLoad,
    selectAllLecturerFields,
    selectSimpleLecturerById,
    updateLecturer,
}

async function selectAllLecturerUser() {

    const res = await db
        .select(
            'lecturer.id as lecturer_id',
            'user.id as user_id',
            'lecturer.availability',
            'lecturer.is_pm',
            'lecturer.is_admin',
            'lecturer.position_id',
            'lecturer.department_id',
            'lecturer.location_id',
            'user.fullname',
            'user.email_work',
            'user.email_personal',
            'user.contact_no',
            'user.school_id',
            'user.campus_id',
            'user.is_full_time',
        )
        .from('lecturer')
        .innerJoin('user', 'lecturer.user_id', 'user.id')
    return res;
}

async function updateLecturer(lecturer_id, updateObject) {
    return await db('lecturer')
        .where({ id: lecturer_id })
        .update(updateObject)
}

async function selectLecturerUserById(lecturer_id) {

    const res = await db
        .select(
            'lecturer.id as lecturer_id',
            'user.id as user_id',
            'lecturer.availability',
            'lecturer.is_pm',
            'lecturer.is_admin',
            'lecturer.position_id',
            'lecturer.department_id',
            'lecturer.location_id',
            'user.fullname',
            'user.email_work',
            'user.email_personal',
            'user.contact_no',
            'user.school_id',
            'user.campus_id',
            'user.is_full_time',
        )
        .from('lecturer')
        .innerJoin('user', 'lecturer.user_id', 'user.id')
        .where({ "lecturer.id": lecturer_id })
    return res;
}

async function selectSimpleLecturerById(id) {
    return await db
        .select(
            'lecturer.id as lecturer_id',
            'user.fullname as fullname'
        )
        .from('lecturer')
        .where({
            "lecturer.id": id,
        })
        .innerJoin('user', 'lecturer.user_id', 'user.id')
        .limit(1);
}

// RAW QUERY:
// SELECT lecturer.id AS lecturer_id, S.s_load, M.m_load
// FROM lecturer
// LEFT JOIN(
//    SELECT lecturer.id AS lecturer_id, COUNT(assignment.supervisor_id) AS s_load
//    FROM assignment
//    RIGHT JOIN lecturer ON lecturer.id = assignment.supervisor_id
//    GROUP BY lecturer.id
// ) 
// AS S ON S.lecturer_id = lecturer.id
// LEFT JOIN(
//         SELECT lecturer.id AS lecturer_id, COUNT(assignment.marker_id) AS m_load
// FROM assignment
// RIGHT JOIN lecturer ON lecturer.id = assignment.marker_id
// GROUP BY lecturer.id
//     ) AS M ON M.lecturer_id = lecturer.id
// GROUP BY lecturer.id


async function selectAllLecturerLoad() {
    try {
        const res = await db.select(
            'lecturer.id AS lecturer_id',
            'S.s_load',
            'M.m_load'
        ).from('lecturer')
            .leftJoin(
                db.select('lecturer.id AS lecturer_id')
                    .count('assignment.supervisor_id AS s_load')
                    .from('assignment')
                    .rightJoin('lecturer', 'lecturer.id', 'assignment.supervisor_id')
                    .groupBy('lecturer.id')
                    .as('S'),
                function () {
                    this.on('S.lecturer_id', '=', 'lecturer.id')
                }
            )
            .leftJoin(
                db.select('lecturer.id AS lecturer_id')
                    .count('assignment.marker_id AS m_load')
                    .from('assignment')
                    .rightJoin('lecturer', 'lecturer.id', 'assignment.marker_id')
                    .groupBy('lecturer.id')
                    .as('M'),
                function () {
                    this.on('M.lecturer_id', '=', 'lecturer.id')
                }
            )
            .groupBy('lecturer.id')
            .catch(err => { throw err });
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function selectAllLecturerFields() {
    const res = await db.select('lect_field.lect_id as lecturer_id', 'lect_field.field_id', 'field.name as field_name')
        .from('lect_field')
        .innerJoin('field', 'lect_field.field_id', 'field.id');
    return res;
}