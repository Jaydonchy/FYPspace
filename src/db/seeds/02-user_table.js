
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        () => {
            return knex('user').truncate()
                .then(
                    () => {
                        return knex.raw('SET foreign_key_checks=1')
                    }
                );
        }
    )
        .then(function () {
            // Inserts seed entries
            return knex('user').insert([
                {
                    fullname: "Jaydon Chong Hong Yong",
                    email_work: "TP050585@mail.apu.edu.my",
                    email_personal: "Jaydonchong88@gmail.com",
                    contact_no: "+60123456",
                    password:"test",
                    school_id: 1,
                    campus_id: 2,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Karthik Arunasalam",
                    email_work: "TP0543534@mail.apu.edu.my",
                    email_personal: "Karthik@gmail.com",
                    contact_no: "+6016 555 5555",
                    password:"test",
                    school_id: 2,
                    campus_id: 1,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Emir Saidov",
                    email_work: "TP056654@mail.apu.edu.my",
                    email_personal: null,
                    contact_no: "+32 555 5555",
                    password:"test",
                    school_id: 4,
                    campus_id: 3,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Dhason Padmakumar",
                    email_work: "TP050585@staffmail.apu.edu.my",
                    email_personal: "Jaydonchong88@gmail.com",
                    contact_no: "+60123456",
                    password:"test",
                    school_id: 2,
                    campus_id: 2,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Dr. Peele",
                    email_work: "TP0544334@staffmail.apu.edu.my",
                    email_personal: "Karthik@gmail.com",
                    contact_no: "+6016 555 5555",
                    password:"test",
                    school_id: 2,
                    campus_id: 3,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Prof. Michael",
                    email_work: "TP0532@staffmail.apu.edu.my",
                    email_personal: "Karthik@gmail.com",
                    contact_no: "+6016 555 5555",
                    password:"test",
                    school_id: 3,
                    campus_id: 1,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Prof. Jackk Of",
                    email_work: "TP0543534@staffmail.apu.edu.my",
                    email_personal: "Karthik@gmail.com",
                    contact_no: "+6016 555 5555",
                    password:"test",
                    school_id: 4,
                    campus_id: 1,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Prof. Disney",
                    email_work: "TP0543224@staffmail.apu.edu.my",
                    email_personal: "Karthik@gmail.com",
                    contact_no: "+6016 555 5555",
                    password:"test",
                    school_id: 3,
                    campus_id: 2,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Admin Guy",
                    email_work: "TP05322354@staffmail.apu.edu.my",
                    email_personal: null,
                    contact_no: "+32 555 5555",
                    password:"test",
                    school_id: 4,
                    campus_id: 3,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Student A",
                    email_work: "TP04322354@mail.apu.edu.my",
                    email_personal: null,
                    contact_no: "+32 555 5555",
                    password:"test",
                    school_id: 4,
                    campus_id: 3,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Student B",
                    email_work: "TP0537854@staffmail.apu.edu.my",
                    email_personal: null,
                    contact_no: "+32 555 5555",
                    password:"test",
                    school_id: 4,
                    campus_id: 3,
                    is_full_time: true,
                    is_active: true,
                },
                {
                    fullname: "Student C",
                    email_work: "TP055454@staffmail.apu.edu.my",
                    email_personal: null,
                    contact_no: "+32 555 5555",
                    password:"test",
                    school_id: 4,
                    campus_id: 3,
                    is_full_time: true,
                    is_active: true,
                },
            ]);
        });
};
