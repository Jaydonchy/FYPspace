
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return ['proposal_form','specification_form'].map(table=>{
                return knex(table).truncate()
            });
        }
    ).then(function () {
        return knex.raw('SET foreign_key_checks = 1');
    })
        .then(function () {
            // Inserts seed entries
            return knex('proposal_form').insert([
                {
                    introduction:"sample intro",
                },
                {
                    problem_statement:"sample problem statement",
                },
                {
                    introduction:"sample lit review",
                },
            ])
        })
        .then(function() {
            return knex('specification_form').insert([
                {
                    project_background: "sample project bg"
                },
                {
                    resources: "sample resources"
                },
                {
                    research: "sample research"
                },
            ])
        });
};
