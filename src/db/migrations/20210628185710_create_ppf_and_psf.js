
exports.up = function (knex) {
    return knex.schema
        .createTable('proposal_form', table => {
            table.increments('id');
            ['introduction', 'problem_statement', 'project_aim', 'project_obj', 'lit_review', 'deliverables']
                .map(section =>
                    table.string(section,'65535')
                        .defaultTo()
                );
            ['completed', 'approved']
                .map(status =>
                    table.boolean(status)
                        .defaultTo(0)
                );
        })
        .createTable('specification_form', table => {
            table.increments('id');
            ['project_background', 'project_objectives', 'resources', 'research', 'dev_plan', 'test_plan']
                .map(section =>
                    table.string(section,'65535')
                        .defaultTo()
                );
            ['completed', 'approved']
                .map(status =>
                    table.boolean(status)
                        .defaultTo(0)
                );
        })

};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('proposal_form')
    .dropTableIfExists('specification_form');
};
