
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('proposed_lecturer').truncate();
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    })
        .then(function () {
            // Inserts seed entries
            return knex('proposed_lecturer').insert([
                {
                    student_id: 1,
                    lecturer_id: 2,
                    priority: 1
                },
                {
                    student_id: 1,
                    lecturer_id: 1,
                    priority: 2
                },
                {
                    student_id: 1,
                    lecturer_id: 3,
                    priority: 3
                },
                {
                    student_id: 1,
                    lecturer_id: 4,
                    priority: 4
                },
                {
                    student_id: 1,
                    lecturer_id: 1,
                    priority: 5
                },
                {
                    student_id: 2,
                    lecturer_id: 3,
                    priority: 2
                },
                {
                    student_id: 3,
                    lecturer_id: 4,
                    priority: 1
                },
                {
                    student_id: 2,
                    lecturer_id: 3,
                    priority: 1
                },
                {
                    student_id: 5,
                    lecturer_id: 3,
                    priority: 1
                },
            ]);
        });
};
