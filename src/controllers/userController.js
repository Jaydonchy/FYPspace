//Require Model
const userModel = require('../models/userModel');
const basicModel = require('../models/basicModel');

//Methods

const selectAllCampus = (req, res) => {
    const promise = basicModel.selectAll('campus')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving courses, ${err}` }));
};

const selectAllSchools = (req, res) => {
    const promise = basicModel.selectAll('school')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving courses, ${err}` }));
};

const login = (req, res) => {
    query = userModel.getLoginCredentials(req.body)
        .then(q => res.status(200).send(q))
        .catch(q => res.status(500).send({ message: ' error in login' }));
}

const selectSchoolById = (req, res) => {
    const { id } = req.params;
    query = basicModel.selectOneById('school', id)
        .then(q => res.status(200).send(q))
        .catch(q => res.status(400).send({ message: 'error in getting specific school' }));
}

//Exports
module.exports = {
    selectAllCampus,
    selectAllSchools,
    selectSchoolById,
    login,
}
