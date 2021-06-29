
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('question').truncate();
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    })
        .then(function () {
            // Inserts seed entries
            return knex('question').insert([
                {
                    title: "FYP Management System",
                    student_id: 1,
                    supervisor_id: 3,
                    marker_id: 2,
                    project_owner: "APU Lecturer"
                },
                {
                    title: "Finance Management APP",
                    supervisor_id: 2,
                    marker_id: 1,
                    project_owner: "3rd Party Hilti"
                },
                {
                    title: "Random Statistics on Financial Distribution",
                    project_owner: "idea Generator"
                },
            ]);
        });
};
