
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
                    tp_number: "TP050585",
                    level_of_study: 1,
                    intake_id: 1
                },
                {
                    user_id: 2,
                    tp_number: "TP012345",
                    level_of_study: 2,
                    intake_id: 2
                },
                {
                    user_id: 3,
                    tp_number: "TP023456",
                    level_of_study: 3,
                    intake_id: 3
                }
            ])
        })
};
