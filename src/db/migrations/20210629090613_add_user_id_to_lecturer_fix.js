
exports.up = function (knex) {
    return knex.schema.alterTable('lecturer', table => {
        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.unique('user_id');
        table.index('user_id');
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('lecturer', table => {
        table.dropForeign('user_id');
        table.dropColumn('user_id');
    })
};
