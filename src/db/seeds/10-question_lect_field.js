
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(
            function () {
                return knex('question_field').truncate()
            }
        ).then(function () {
            return knex('lect_field').truncate();
        }).then(function () {
            return knex.raw('SET foreign_key_checks = 1');
        })
        .then(function () {
            return knex('question_field').insert([
                {
                    question_id: 1,
                    field_id: 1
                },
                {
                    question_id: 1,
                    field_id: 2
                },
                {
                    question_id: 2,
                    field_id: 1
                },
                {
                    question_id: 2,
                    field_id: 3
                },
                {
                    question_id: 3,
                    field_id: 2
                },
            ]);
        })
        .then(function () {
            return knex('lect_field').insert([
                {
                    lect_id: 1,
                    field_id: 1
                },
                {
                    lect_id: 1,
                    field_id: 2
                },
                {
                    lect_id: 2,
                    field_id: 1
                },
                {
                    lect_id: 2,
                    field_id: 3
                },
                {
                    lect_id: 3,
                    field_id: 2
                },
                {
                    lect_id: 4,
                    field_id: 3
                },
                {
                    lect_id: 5,
                    field_id: 1
                },
                {
                    lect_id: 5,
                    field_id: 2
                },
                {
                    lect_id: 5,
                    field_id: 3
                },
                {
                    lect_id: 3,
                    field_id: 2
                },
            ])
        });
};
