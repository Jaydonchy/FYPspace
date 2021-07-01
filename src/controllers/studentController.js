const studentModel = require('../models/studentModel');
const basicModel = require('../models/basicModel');

const selectAllCourses = (req, res) => {
    const promise = basicModel.selectAll('course')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving courses, ${err}` }));
};

const selectAllIntakes = (req, res) => {
    const promise = basicModel.selectAll('intake')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving intakes : ${err}` }));
}

const selectAllStudyLevels = (req, res) => {
    const promise = basicModel.selectAll('study_level')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving Study level : ${err}` }));
}

const registerNewStudent = (req, res) => {
    const {
        tp_number,
        fullname,
        level_of_study,
        intake_id,
        password,
        school_id,
        email_work,
        email_personal,
        contact_no,
        campus_id,
        is_full_time,
        course_id
    } = req.body;
    const student_user = {
        user: {
            fullname: fullname,
            email_work: email_work,
            email_personal: email_personal,
            contact_no: contact_no,
            school_id: school_id.id,
            campus_id: campus_id.id,
            is_full_time: is_full_time.bool_value,
            password: password,
        },
        student: {
            user_id: "",
            level_of_study: level_of_study.id,
            tp_number: tp_number,
            course_id: course_id.id,
            intake_id: intake_id.id,
        }
    }
    const promise = studentModel.addNewStudent(student_user)
        .then(
            query_res => res.status(200).send({message: 'Signup successful'})
        )
        .catch(
            err => res.status(400).send({ message: `error in creating new student Error: ${err}` })
        );
}


module.exports = {
    selectAllCourses,
    selectAllIntakes,
    selectAllStudyLevels,
    registerNewStudent,
}