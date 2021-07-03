const basicModel = require('../models/basicModel');
// const assignmentModel = require('../models/assignmentModel');
const lecturerModel = require('../models/lecturerModel');

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

const getAllPosition = async (req,res) => {
    return await basicModel.selectAll('position')
    .then(query => res.status(200).send(query))
    .catch(err => res.status(500).send({ message: err }));
}

const getAllLecturerUser = async () => {
    return await lecturerModel.selectAllLecturerUser()
        .then(resArr => {
            return resArr = resArr.map((resElement) => {
                return restructureLecturerUser(resElement);
            });
        })
        .catch(err => console.log(`getLecturerUser: ${err}`))

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

//Restructure db lecturer user to match front end interface
const restructureLecturerUser = ({
    lecturer_id,
    user_id,
    availability,
    is_pm,
    is_admin,
    location_id,
    position_id,
    department_id,
    fullname,
    email_work,
    email_personal,
    contact_no,
    school_id,
    campus_id,
    is_full_time,
}) => {
    return {
        user: {
            user_id: user_id,
            fullname: fullname,
            email_work: email_work,
            email_personal: email_personal,
            contact_no: contact_no,
            school_id: school_id,
            campus_id: campus_id,
            is_full_time: is_full_time,
        },
        lecturer: {
            lecturer_id: lecturer_id,
            availability: availability,
            is_pm: is_pm,
            is_admin: is_admin,
            location_id: location_id,
            position_id: position_id,
            department_id: department_id,
        },
        lect_field: [],
        supervisor_load: 0,
        marker_load: 0,
    }
}


module.exports = {
    getAllLecturerItems,
    getAllDepartment,
    getAllLocation,
    getAllPosition,
}