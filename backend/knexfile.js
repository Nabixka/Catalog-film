require("dotenv").config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'catalog_film',
      user: process.env.DB_USER,
      port: 5432,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST
    },
    migrations: {
      directory: './migration'
    },
    seeds: {
      directory: './seeder'
    }
  }

};
