const db = require('../Helper/knex-connection');

module.exports = {
    selectQuestionBySupervisorId,
}

async function selectQuestionBySupervisorId(lecturer_id) {
    return await db.select(
        'id as question_id',
        'title as question_title',
        'student_id',
        'supervisor_id',
        'marker_id'
    )
        .from('question')
        .where({ supervisor_id: lecturer_id })
        .orWhere({ marker_id: lecturer_id })
}