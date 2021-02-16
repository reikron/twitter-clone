const Knex = require("knex");

const config = require("../knexfile");
const env = process.env.NODE_ENV || "development";
config[env].log = {
  warn(message) {
  },
  error(message) {
  },
  deprecate(message) {
  },
  debug(message) {
  },
};
module.exports = Knex(config[env]);