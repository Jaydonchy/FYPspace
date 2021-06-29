
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('assignment_field').truncate();
        }).then(function () {
            return knex.raw('SET foreign_key_checks = 1');
        })
        .then(function () {
            // Inserts seed entries
            return knex('assignment_field').insert([
                {
                    assignment_id: 1,
                    field_id: 2,
                },
                {
                    assignment_id: 1,
                    field_id: 3
                },
                {
                    assignment_id: 3,
                    field_id: 2
                }
            ]);
        });
};
