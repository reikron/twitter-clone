const { join } = require("path");

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: join(__dirname, "/data/db/development.sqlite3")
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, "/data/migrations"),
    },
    seeds: {
      directory: join(__dirname, "/data/seeds"),
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:"
    },
    useNullAsDefault: true,

    migrations: {
      directory: join(__dirname, "/data/migrations"),
    },
    seeds: {
      directory: join(__dirname, "/data/seeds"),
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,

    migrations: {
      directory: join(__dirname, "/data/migrations"),
    },
    seeds: {
      directory: join(__dirname, "/data/seeds"),
    }
  }
}