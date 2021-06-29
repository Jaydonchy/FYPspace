let lects = ["lect_one","lect_two","lect_three","lect_four","lect_five"];
exports.up = function (knex) {
    return knex.schema
        .createTable('proposed_lecturer', table => {
            table.integer('student_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('student')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            lects.map(lect=>{
                table.integer(lect)
                .unsigned()
                .defaultTo(null)
                .references('id')
                .inTable('lecturer')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            });
            table.unique('student_id');
            table.index('student_id');
        });

};

exports.down = function (knex) {
    return knex.schema
    .table('proposed_lecturer',table=>{
        lects.map(lect=> table.dropForeign(lect));
    })
    .dropTableIfExists('proposed_lecturer');
};
