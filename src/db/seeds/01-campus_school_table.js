
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0').then(
        function () {
            return knex('school').truncate()
                .then(
                    () => {
                        return knex('campus').truncate();
                    }
                )
                .then(
                    () => {
                        return knex.raw('SET foreign_key_checks=1')
                    }
                );
        }
    ).then(function () {
        return knex('campus').insert([
            { name: 'APIIT' },
            { name: 'APU' },
            { name: 'LBEF' },
        ]).then(
            function () {
                return knex('school').insert([
                    {
                        name: 'SOCT',
                        description: 'School of Computing and Technology'
                    },
                    {
                        name: 'SOAF',
                        description: 'School of Accounting Finance'
                    },
                    {
                        name: 'SOB',
                        description: 'School of Business'
                    },
                    {
                        name: 'SOMM',
                        description: 'School of Marketing Management'
                    },
                    {
                        name: 'SOAQ',
                        description: 'School of Mathematics, Actuarial and Quantitative Studies'
                    },
                    {
                        name: 'SOMD',
                        description: 'School of Media, Arts & Design'
                    },
                ]);
            }
        );
    });
};
