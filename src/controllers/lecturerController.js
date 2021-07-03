// const basicModel = require('../models/basicModel');
// const assignmentModel = require('../models/assignmentModel');
const lecturerModel = require('../models/lecturerModel');

const getAllLecturerUser = async () => {
    return await lecturerModel.selectAllLecturerUser()
        .then(resArr => {
            return resArr = resArr.map((resElement) => {
                return restructureLecturerUser(resElement);
            });
        })
        .catch(err => console.log(`getLecturerUser: ${err}`))

}

const groupLecturerLoad = async (req, res) => {
    lecturerModel.selectAllLecturerLoad()
        .then(q => res.status(200).send(q))
        .catch(err => res.status(500).send({message:err}));
}

const getAllLecturerItems = async (req, res) => {
    //Promise: Get Lecturer User
    const lecturerUsers = getAllLecturerUser();
    // const supervisor_load = assignmentModel.getAllSupervisoryLoad();
    // const marker_load = assignmentModel.getAllMarkerLoad();

    Promise.all([lecturerUsers, ])
        .then(([lecturerUsers, ]))
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
    groupLecturerLoad,
}