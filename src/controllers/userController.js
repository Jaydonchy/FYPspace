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

//Exports
module.exports = {
    selectAllCampus,
    selectAllSchools,
}
