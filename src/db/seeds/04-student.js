
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('student').truncate()
                .then(
                    () => {
                        return knex.raw('SET foreign_key_checks=1')
                    }
                );
        }).then(function () {
            // Inserts seed entries
            return knex('student').insert([
                {
                    user_id: 1,
                    tp_number: "050585",
                    level_of_study: 1,
                    intake_id: 1,
                    course_id: 1
                },
                {
                    user_id: 2,
                    tp_number: "012345",
                    level_of_study: 2,
                    intake_id: 2,
                    course_id: 2,
                },
                {
                    user_id: 3,
                    tp_number: "234567",
                    level_of_study: 3,
                    intake_id: 3,
                    course_id: 3,
                },
                {
                    user_id: 10,
                    tp_number: "888000",
                    level_of_study: 3,
                    intake_id: 3,
                    course_id: 4,
                },
                {
                    user_id: 11,
                    tp_number: "047584",
                    level_of_study: 2,
                    intake_id: 2,
                    course_id: 3,
                },
                {
                    user_id: 12,
                    tp_number: "548694",
                    level_of_study: 1,
                    intake_id: 2,
                    course_id: 1,
                },
            ])
        })
};
