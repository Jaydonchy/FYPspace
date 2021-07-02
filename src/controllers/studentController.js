const studentModel = require('../models/studentModel');
const basicModel = require('../models/basicModel');
const assignmentModel = require('../models/assignmentModel');

const getAllCourses = (req, res) => {
    basicModel.selectAll('course')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving courses, ${err}` }));
}

const getAllIntakes = (req, res) => {
    basicModel.selectAll('intake')
    .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving intakes : ${err}` }));
}

const getAllStudyLevels = (req, res) => {
    basicModel.selectAll('study_level')
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving Study level : ${err}` }));
}

const getStudentList = (req, res) => {
    basicModel.selectAllByField('student', { id: 'id' })
        .then(query => res.status(200).send(query))
        .catch(err => res.status(400).send({ message: `error in retrieving student list: ${err}` }))
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
    studentModel.addNewStudent(student_user)
        .then(
            res.status(200).send({ message: 'Signup successful' })
        )
        .catch(
            err => res.status(400).send({ message: `error in creating new student Error: ${err}` })
        );
}

//Getting Student Items for Matching process
const getAllStudentUsers = async () => {
    return await studentModel.selectAllStudentUser()
        .then(resArr => {
            return resArr = resArr.map((resElement) => {
                //Split Student User into Student and User
                //Restructure studentuser
                return restructureStudentUser(resElement);
            });
        })
        .catch(err => console.log(`getAllStudentUsers: ${err}`));
}

const getAllAssignmentWithField = async () => {
    const assignments_fields = assignmentModel.selectAllAssignmentFields();
    const assignments = assignmentModel.selectAllAssignments()
        .then(resArr => {
            return resArr = resArr.map(resElement => {
                //Restructure Assignment to add Assignment field
                return restructureAssignment(resElement);
            })
        }).catch(err =>
            console.log(`Error in retrieving Assignments: ${err}`));
    const assignment_items = await Promise.all([assignments_fields, assignments])
        .then(([assignments_fields, assignments]) => {
            assignments_fields.forEach(({ assignment_id, field_id, field_name }) => {
                assignments.some(((assignment) => {
                    if (assignment.assignment_id == assignment_id) {
                        const obj = {
                            field_id: field_id,
                            field_name: field_name
                        }
                        assignment.assignment_fields.push(obj);
                        return true;
                    }
                }));
            });
            return assignments;
        })
        .catch(err => console.log(err));
    return assignment_items;
}

const getAllStudentItems = async (req, res) => {
    //Promise : Get Student User
    const studentUsers = getAllStudentUsers();
    //Promise : Get Assignment and Get Assignment_field
    const assignmentFields = getAllAssignmentWithField();
    Promise.all([assignmentFields, studentUsers])
        .then(([assignmentFields, studentUsers]) => {
            //Group the assignment with student id
            return assignmentFields.map(assignment => {
                const { user, student } = studentUsers.find(studentUser => studentUser.id == assignmentFields.student_id)
                return {
                    user: user,
                    student: student,
                    assignment: assignment,
                }
            })
        })
        .then(items => res.status(200).send(items))
        .catch(err => res.status(500).send({ message: err }));
}

//Restructure db assignment to match front end interface
const restructureAssignment = ({
    id,
    student_id,
    title,
    description,
    supervisor_id,
    marker_id,
    ppf,
    psf,
    ir,
    final }) => {
    return {
        assignment_id: id,
        student_id: student_id,
        title: title,
        description: description,
        supervisor_id: supervisor_id,
        marker_id: marker_id,
        ppf: ppf,
        psf: psf,
        ir: ir,
        final: final,
        assignment_fields: [],
    };
}

//Restructure select student inner join user to match frontend interface
const restructureStudentUser = ({
    student_id,
    user_id,
    level_of_study,
    course_id,
    intake_id,
    tp_number,
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
            id: user_id,
            fullaname: fullname,
            email_work: email_work,
            email_personal: email_personal,
            contact_no: contact_no,
            school_id: school_id,
            campus_id: campus_id,
            is_full_time: is_full_time,
        },
        student: {
            id: student_id,
            tp_number: tp_number,
            level_of_study: level_of_study,
            course_id: course_id,
            intake_id: intake_id,
        }
    }
}

module.exports = {
    getAllCourses,
    getAllIntakes,
    getAllStudyLevels,
    registerNewStudent,
    getStudentList,
    getAllStudentItems,
}