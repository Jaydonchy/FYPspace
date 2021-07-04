
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('lecturer').truncate()
                .then(function () {
                    return knex('lecturer').truncate();
                })
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    }).then(function () {
        // Inserts seed entries
        return knex('lecturer').insert([
            {
                user_id: 4,
                position_id: 2,
                is_pm: true,
                is_admin: true,
                department_id: 1,
                location_id: 1
            },
            {
                user_id: 5,
                position_id: 1,
                is_pm: false,
                is_admin: false,
                department_id: 2,
                location_id: 2,
                availability: false,
            },
            {
                user_id: 6,
                position_id: 3,
                is_pm: true,
                is_admin: false,
                department_id: 3,
                location_id: 2
            },
            {
                user_id: 7,
                position_id: 3,
                is_pm: false,
                is_admin: false,
                department_id: 3,
                location_id: 2,
                availability: false,
            },
            {
                user_id: 8,
                position_id: 4,
                is_pm: false,
                is_admin: false,
                department_id: 3,
                location_id: 2
            },
            {
                user_id: 9,
                position_id: 3,
                is_pm: false,
                is_admin: true,
                department_id: 3,
                location_id: 2
            },
        ]);
    });
};
