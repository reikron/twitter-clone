
exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex("users").insert([
        {
          fullname: "Eder Almeida",
          email: "reikron8@gmail.com",
          passwordHash: "098f6bcd4621d373cade4e832627b4f6",
          timestamp: Date.now(),
          role: "admin"
        }
      ]);
    });
};
