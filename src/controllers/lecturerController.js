const basicModel = require('../models/basicModel');
// const assignmentModel = require('../models/assignmentModel');
const lecturerModel = require('../models/lecturerModel');
const structureHelper = require('../models/userStructureHelper')


const getAllDepartment = async (req, res) => {
    return await basicModel.selectAll('department')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(500).send({ message: err }));
}

const getAllLocation = async (req, res) => {
    return await basicModel.selectAll('location')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(500).send({ message: err }));
}

const getAllPosition = async (req, res) => {
    return await basicModel.selectAll('position')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(500).send({ message: err }));
}

const getAllLecturerUser = async () => {
    return await lecturerModel.selectAllLecturerUser()
        .then(resArr => {
            return resArr = resArr.map((resElement) => {
                return structureHelper.restructureLecturerUser(resElement);
            });
        })
        .catch(err => console.log(`getLecturerUser: ${err}`))

}

const getLecturerNameById = async (req, res) => {
    const { id } = req.params;
    return await lecturerModel.selectSimpleLecturerById(id)
        .then(query => res.status(200).send(query[0]))
        .catch(err => res.status(500).send({ message: `lecturer not found :${err}` }))
}

const getAllLecturerItems = async (req, res) => {
    //Promise: Get Lecturer User
    const lecturerUsers = getAllLecturerUser();
    const lecturerLoads = lecturerModel.selectAllLecturerLoad();
    const lecturerFields = lecturerModel.selectAllLecturerFields();

    Promise.all([lecturerUsers, lecturerLoads, lecturerFields])
        .then(([lecturerUsers, lecturerLoads, lecturerFields]) => {
            return [lecturerUsers.map((lecturerUser) => {
                const { s_load, m_load } = lecturerLoads
                    .find(load => lecturerUser.lecturer.lecturer_id == load.lecturer_id)
                lecturerUser.supervisor_load = s_load;
                lecturerUser.marker_load = m_load;
                return lecturerUser;
            }), lecturerFields]
        }).then(([lecturerUsers, lecturerFields]) => {
            lecturerFields.forEach(({ lecturer_id, field_id, field_name }) =>
                lecturerUsers.forEach((lecturerUser) => {
                    if (lecturerUser.lecturer.lecturer_id == lecturer_id) {
                        lecturerUser.lect_field.push({ field_id: field_id, field_name: field_name })
                        return
                    }
                })
            )
            return lecturerUsers;
        })
        .then(items => res.status(200).send(items))
        .catch(err => res.status(500).send({ message: err }))
}

module.exports = {
    getAllLecturerItems,
    getAllDepartment,
    getAllLocation,
    getAllPosition,
    getLecturerNameById,
}