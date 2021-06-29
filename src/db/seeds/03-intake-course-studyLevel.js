
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('course').truncate()
                .then(function () {
                    return knex('intake').truncate();
                })
                .then(function(){
                    return knex('study_level').truncate();
                })
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    })
        .then(function () {
            // Inserts seed entries
            return knex('course').insert([
                { name: 'Software Engineering' },
                { name: 'Marketing' },
                { name: 'Computer Science' },
                { name: 'Computer Science (DA)' }
            ]).then(function () {
                return knex('intake').insert([
                    {
                        name:"UC3F2011SE",
                        ppf_submission:'2021-08-03 00:00:00',
                        psf_submission:'2021-08-21 00:00:00',
                        ir_submission:'2021-10-12 00:00:00',
                        final_submission: '2021-10-14 00:00:00',
                        course_id: 1,
                    },
                    {
                        name:"UC3F2011CS",
                        ppf_submission:'2021-02-03 00:00:00',
                        psf_submission:'2021-08-21 00:00:00',
                        ir_submission:'2021-10-12 00:00:00',
                        final_submission: '2021-10-14 00:00:00',
                        course_id: 2,
                    },
                    {
                        name:"UC3F2011IOT",
                        ppf_submission:'2021-04-03 00:00:00',
                        psf_submission:'2021-08-21 00:00:00',
                        ir_submission:'2021-10-12 00:00:00',
                        final_submission: '2021-11-14 00:00:00',
                        course_id: 3,
                    },
                    {
                        name:"UC2F2011MM",
                        ppf_submission:'2021-08-03 00:00:00',
                        psf_submission:'2021-07-21 00:00:00',
                        ir_submission:'2021-10-12 00:00:00',
                        final_submission: '2021-12-14 00:00:00',
                        course_id: 4,
                    },
                ])
            }).then(function(){
                return knex('study_level').insert([
                    {
                        name: "BRSM/RMCT/Diploma/student"
                    },
                    {
                        name:"FYP Student"
                    },
                    {
                        name:"Intern / Ongoing / About to Intern"
                    }
                ])
            });
        });
};
