module.exports = {
  development: {
    client: "pg",
    connection: {
      host : '127.0.0.1',
      user : 'beniciodanielbarreto',
      password : '',
      database : 'next-graphql'
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      host : '127.0.0.1',
      user : 'beniciodanielbarreto',
      password : '',
      database : 'next-graphql'
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};