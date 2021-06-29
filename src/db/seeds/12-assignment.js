
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('assignment').truncate();
        }).then(function () {
            return knex.raw('SET foreign_key_checks = 1');
        })
        .then(function () {
            // Inserts seed entries
            return knex('assignment').insert([
                {
                    student_id: 1,
                    title: "FYP Management System",
                    description: "An FYP Management System for Blended Learning",
                    supervisor_id: 1,
                    marker_id: 2,
                    ppf: 1,
                    psf: 2,
                    ir: true,
                    final: false,
                },
                {
                    student_id: 2,
                    title: "Second FYP title",
                    description: "Sypnopsis of the second FYP title",
                    supervisor_id: 2,
                    marker_id: 3,
                    ppf: 1,
                    psf: 2,
                    ir: true,
                    final: true,
                },
                {
                    student_id: 3,
                    title: "Third FYP title",
                    description: "Sypnopsis of the third FYP title",
                    supervisor_id: 3,
                    marker_id: 1,
                    ppf: 1,
                    psf: 2,
                    ir: false,
                    final: false,
                },
            ]);
        })
        .then(function () {
            return;
        });
};
