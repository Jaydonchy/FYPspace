
exports.up = function (knex) {
    return knex.schema.alterTable('student', table => {
        table.string('tp_number')
            .notNullable();
        table.unique('tp_number');
        table.index('tp_number');
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('student',table=>{
        table.dropColumn('tp_number');
    })
};
