// const studentModel = require('../models/lecturerModel');
const basicModel = require('../models/basicModel');
const assignmentModel = require('../models/assignmentModel');

const getAllSupervisoryLoad = (req, res) => {
    assignmentModel.selectAllSupervisoryLoad()
        .then(supervisorLoadArr =>
            res.status(200).send(supervisorLoadArr)
        ).catch(err =>
            res.status(500).send({ message: `Error in retrieving supervisory load ${err}` })
        );
}

const getAllMarkerLoad = (req, res) => {
    assignmentModel.selectAllMarkerLoad()
        .then(markerLoadArr =>
            res.status(200).send(markerLoadArr)
        ).catch(err =>
            res.status(500).send({ message: `Error in retrieving supervisory load ${err}` })
        );
}


module.exports = {
    getAllSupervisoryLoad,
    getAllMarkerLoad,
}