const questionModel = require('../models/questionModel');

const getLecturerQuestion = (req, res) => {
    const { lecturer_id } = req.params;
    questionModel.selectQuestionBySupervisorId(lecturer_id)
        .then(q => res.status(200).send(q))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getLecturerQuestion,
}