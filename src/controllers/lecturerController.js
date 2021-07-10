const basicModel = require('../models/basicModel');
// const assignmentModel = require('../models/assignmentModel');
const lecturerModel = require('../models/lecturerModel');
const userModel = require('../models/userModel')
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

const updateLecturerProfile = async (req, res) => {
    const {
        user_id,
        fullname,
        password,
        school_id,
        campus_id,
        email_work,
        email_personal,
        contact_no,
        is_full_time,
        lecturer_id,
        position_id,
        location_id,
        department_id
    } = req.body;
    const lecturerUser = {
        user: {
            fullname: fullname,
            password: password,
            school_id: school_id,
            campus_id: campus_id,
            email_work: email_work,
            email_personal: email_personal,
            contact_no: contact_no,
            is_full_time: is_full_time.bool_val,
        },
        lecturer: {
            position_id: position_id,
            location_id: location_id,
            department_id: department_id,
        }
    }
    const validateUserEmail = userModel.selectUserWhere({ email_work: email_work }).then(q => q.filter(e => e.id != user_id));
    validateUserEmail.then(validation => {
        if (validation.length == 0) {
            userModel.updateUser(user_id, lecturerUser.user)
                .then(lecturerModel.updateLecturer(lecturer_id, lecturerUser.lecturer))
                .then(query => res.status(200).send({ query: query }))
                .catch(err => res.status(500).send({ message: `error in updating lecturer ${err}` }))
        } else res.status(502).send({ message: `Email already have an account` })
    })
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
    updateLecturerProfile,
}