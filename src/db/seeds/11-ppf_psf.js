
exports.seed = function (knex) {
    // Deletes ALL existing entries
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

    return knex.raw('SET foreign_key_checks = 0')
        .then(function () {
            return knex('proposal_form').truncate()
        }).then(function () {
            return knex('specification_form').truncate()
        }).then(function () {
            return knex.raw('SET foreign_key_checks = 1');
        })
        .then(function () {
            // Inserts seed entries
            return knex('proposal_form').insert([
                {
                    introduction: lorem,
                    problem_statement: lorem,
                    project_aim: lorem,
                    project_obj: lorem,
                    lit_review: lorem,
                    deliverables: lorem,
                    completed: true,
                    approved: false,

                },
                {
                    introduction: lorem,
                    problem_statement: lorem,
                    project_aim: lorem,
                    project_obj: lorem,
                    completed: false,
                    approved: false,
                },
                {
                    introduction: lorem,
                    problem_statement: lorem,
                    project_aim: lorem,
                    deliverables: lorem,
                    completed: true,
                    approved: true,
                },
                {
                    introduction: lorem,
                    problem_statement: lorem,
                    project_aim: lorem,
                    deliverables: lorem,
                    completed: false,
                    approved: true,
                },
                {
                    introduction: lorem,
                    problem_statement: lorem,
                    project_aim: lorem,
                    project_obj: lorem,

                    deliverables: lorem,
                    completed: true,
                    approved: true,
                },
                {
                    introduction: lorem,
                    problem_statement: lorem,
                    project_aim: lorem,

                    lit_review: lorem,
                    deliverables: lorem,
                    completed: true,
                    approved: true,
                },
            ])
        })
        .then(function () {
            return knex('specification_form').insert([
                {
                    project_background: lorem,
                    project_objectives: lorem,
                    resources: lorem,
                    research: lorem,
                    dev_plan: lorem,
                    test_plan: lorem,
                    completed: true,
                    approved: false,
                },
                {
                    project_background: lorem,
                    project_objectives: lorem,
                    resources: lorem,

                    test_plan: lorem,
                    completed: true,
                    approved: true,
                },
                {
                    project_background: lorem,
                    project_objectives: lorem,
                    resources: lorem,

                    completed: false,
                    approved: false,
                },
                {
                    project_background: lorem,
                    project_objectives: lorem,

                    dev_plan: lorem,
                    test_plan: lorem,
                    completed: true,
                    approved: true,
                },
                {
                    project_background: lorem,
                    project_objectives: lorem,
                    resources: lorem,

                    test_plan: lorem,
                    completed: false,
                    approved: false,
                },
                {
                    project_background: lorem,
                    project_objectives: lorem,
                    resources: lorem,

                    test_plan: lorem,
                    completed: true,
                    approved: false,
                },
            ])
        });
};
