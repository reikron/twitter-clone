
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("posts", function (table) {
      table.increments();
      table.integer("userId");
      table.string("body");
      table.integer("timestamp");
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("posts")
  ])
};