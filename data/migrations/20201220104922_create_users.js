
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("users", function (table) {
      table.increments();
      table.string("email");
      table.string("fullname");
      table.enum("role", ["admin", "user"]).defaultTo("user");
      table.string("passwordHash");
      table.integer("timestamp");
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("users")
  ])
};