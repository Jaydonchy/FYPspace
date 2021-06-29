
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('field').truncate();
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    })
        .then(function () {
            // Inserts seed entries
            return knex('field').insert([
                { name:"Software Engineering" },
                { name: "AI" },
                { name: "CyberSecurity" },
                { name: "Marketing" },
                { name: "Sales" },
                { name: "Statistics" },
            ]);
        });
};
