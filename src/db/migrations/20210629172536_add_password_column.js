
exports.up = function (knex) {
    return knex.schema.
        alterTable('user', table => {
            table.string('password')
                .notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
    .alterTable('user',table=>{
        table.dropColumn('password');
    })
};
