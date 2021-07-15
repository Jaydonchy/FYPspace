const userModel = require('../models/userModel')
const studentModel = require('../models/studentModel')
const lecturerModel = require('../models/lecturerModel')
const structureHelper = require('../models/StructureHelper')

const loginUser = (req, res) => {
    userModel.selectUserTypeAuth(req.body).then(userType => {
        if (userType.length == 0) { res.status(200).send([]); return }
        else {
            const [user] = userType;
            if (user.lecturer_id && !user.student_id) {
                lecturerModel.selectLecturerUserById(user.lecturer_id)
                    .then(lecturer => {
                        return lecturer.map(structureHelper.restructureLecturerUser)
                    })
                    .then(lecturerUser => { res.status(200).send(lecturerUser) })
                    .catch(err => console.log(`${err}`));
            }
            else if (!user.lecturer_id && user.student_id) {
                studentModel.selectStudentUserById(user.student_id)
                    .then(student => {
                        return student.map(structureHelper.restructureStudentUser)
                    })
                    .then(studentUser => { return res.status(200).send(studentUser) })
                    .catch(err => console.log(`${err}`));
            }
            return;
        }
    }).catch(err => {
        console.log(`Error in Logging in: ${err}`);
        res.sendStatus(400);
    })
}

const refreshSession = (req, res) => {
    const { user_id } = req.body;
    userModel.selectUserTypeById(user_id).then(userType => {
        if (userType.length == 0) { res.status(200).send([]); return }
        else {
            const [user] = userType;
            if (user.lecturer_id && !user.student_id) {
                lecturerModel.selectLecturerUserById(user.lecturer_id)
                    .then(lecturer => {
                        return lecturer.map(structureHelper.restructureLecturerUser)
                    })
                    .then(lecturerUser => { res.status(200).send(lecturerUser) })
                    .catch(err => console.log(`${err}`));
            }
            else if (!user.lecturer_id && user.student_id) {
                studentModel.selectStudentUserById(user.student_id)
                    .then(student => {
                        return student.map(structureHelper.restructureStudentUser)
                    })
                    .then(studentUser => { return res.status(200).send(studentUser) })
                    .catch(err => console.log(`${err}`));
            }
            return;
        }
    }).catch(err => {
        console.log(`Error in Refreshing Session: ${err}`);
        res.sendStatus(400);
    })
}


const getPassword = (req, res) => {
    //Optional validation in the middle
    const { user_id } = req.body;
    return userModel.selectPassword(user_id)
        .then(q => res.status(200).send(q))
        .catch(err => res.status(400).send({ message: `error in retrieving password ${err}` }))
}

module.exports = {
    loginUser,
    getPassword,
    refreshSession,
}