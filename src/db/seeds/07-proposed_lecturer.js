
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
                    lect_one: 1,
                    lect_two: 2,
                    lect_three:3,
                },
                {
                    student_id: 2
                },
                {
                    student_id: 3,
                    lect_one: 2,
                    lect_three: 1,
                    lect_two: 3,
                }
            ]);
        });
};
