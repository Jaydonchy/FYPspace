const assignmentModel = require('../models/assignmentModel');
const structureHelper = require('../models/StructureHelper')


//{student_id,lecturer_id,marker_id}
const assignLecturer = async (req, res) => {
    const param = req.body;
    assignmentModel.updateLecturer(param)
        .then(query => res.status(200).send({ message: 'success', res: query }))
        .catch(err => res.status(400).send({ message: `${err.toString()}` }));
}

const getAssignmentView = (req, res) => {
    const { assignment_id } = req.params;
    assignmentModel.selectAssignmentViewById(assignment_id)
        .then(query => query.map(structureHelper.restructureAssignmentView))
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `${err.toString()}` }));
}



module.exports = {
    assignLecturer,
    getAssignmentView
}