
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("follows", function (table) {
      table.integer("userId");
      table.integer("followId");
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("follows")
  ])
};
