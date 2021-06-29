// Update with your config settings.
const config = require('./config/database.config');
module.exports = {
    development:  {
        client: config.development.client,
        connection: config.development.connection,
        debug:true,
        migrations: {
            directory: __dirname + "/db/migrations",
        },
        seeds: {
            directory: __dirname + "/db/seeds"
        }
        
    }
  };
