
exports.up = function (knex) {
    return knex.schema
        .alterTable('meeting_log', table => {
            table.boolean('approved')
                .defaultTo(0);
        })
};

exports.down = function (knex) {
    return knex.schema
        .alterTable('meeting_log', table => {
            table.dropColumn('approved');
        })
};
