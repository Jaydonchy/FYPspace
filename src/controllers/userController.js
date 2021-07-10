//Require Model
const userModel = require('../models/userModel');
const basicModel = require('../models/basicModel');

//Methods

const getAllCampus = (req, res) => {
    return basicModel.selectAll('campus')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving courses, ${err}` }));
};

const getAllSchools = (req, res) => {
    return basicModel.selectAll('school')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving courses, ${err}` }));
};


const getSchoolById = (req, res) => {
    const { id } = req.params;
    return basicModel.selectOneById('school', id)
        .then(q => res.status(200).send(q))
        .catch(err => res.status(400).send({ message: `error in getting school by id ${err}` }));
}

//Exports
module.exports = {
    getAllCampus,
    getAllSchools,
    getSchoolById,
}
