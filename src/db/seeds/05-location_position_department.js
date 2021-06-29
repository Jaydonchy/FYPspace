
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('location').truncate()
                .then(function () {
                    return knex('position').truncate();
                }).then(function () {
                    return knex('department').truncate();
                });
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    })
        .then(function () {
            // Inserts seed entries
            return knex('location').insert([
                {

                    name: "Level 5 FCET Office",
                },
                {
                    name: " APIIT Lecturer Lounge",
                },
                {
                    name: " Admin Office",
                }
            ]);
        }).then(() =>
            knex('position').insert([
                {
                    name: "Lecturer"
                },
                {
                    name: "Senior Lecturer"
                },
                {
                    name: "Professor"
                },
                {
                    name: "Programme Leader"
                },
            ])).then(() => knex('department').insert([
                {
                    name: "ICT"
                },
                {
                    name: "Maths, Actuarial, Quantitat"
                },
                {
                    name: "Systems and Infrastructure"
                }
            ]));
};
