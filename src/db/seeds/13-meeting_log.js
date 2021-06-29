
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('meeting_log').truncate();
        }).then(function () {
            return knex.raw('SET foreign_key_checks = 1');
        })
        .then(function () {
            // Inserts seed entries
            return knex('meeting_log').insert([
                {
                    assignment_id: 1,
                    approved: true,
                    visible: true,
                    timing: '2021-5-6 00:00:10',
                    items: " items to be discussed ",
                    record:" Items to be recorded",
                    action: "items to be acted upon"
                },
                {
                    assignment_id: 1,
                    approved: false,
                    visible: true,
                    timing: '2021-5-6 23:59:59',
                    items: " items to be discussed ",
                    record:" Items to be recorded",
                    action: "items to be acted upon"
                },
                {
                    assignment_id: 2,
                    approved: true,
                    visible: true,
                    timing: '2021-5-6 00:00:00',
                    items: " items to be discussed ",
                    record:" Items to be recorded",
                    action: "items to be acted upon"
                },
                {
                    assignment_id: 3,
                    approved: false,
                    visible: true,
                    timing: '2021-5-6 00:00:00',
                    items: " items to be discussed ",
                    record:" Items to be recorded",
                    action: "items to be acted upon"
                },
                {
                    assignment_id: 3,
                    approved: false,
                    visible: false,
                    timing: '2021-5-6 00:00:00',
                    items: " items to be discussed ",
                    record:" Items to be recorded",
                    action: "items to be acted upon"
                },
            ]);
        });
};
