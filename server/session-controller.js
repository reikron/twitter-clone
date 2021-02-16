const db = require("./db");
const crypto = require("crypto");

exports.middleware = async (req, res, next) => {
  if (req.session.userId) {
    req.user = await db.select("id", "email", "fullname").from("users").where({ id: req.session.userId });
    req.user = req.user[0];
  }
  next();
}

exports.create = async (req, res) => {
  let { email, password } = req.body;
  let passwordHash = crypto.createHash('md5').update(password).digest('hex');
  let row = await db.select("id", "email", "fullname", "passwordHash").from("users").where({ email, passwordHash });
  if (row.length == 1) {
    req.session.userId = row[0].id;
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    await new Promise((resolve, reject) => {
      req.session.save(function (err) {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
  delete row[0].passwordHash;
  console.log("Session started \"%s\"", row[0].fullname);
  res.status(200).json(row[0]);
}

exports.destroy = async (req, res) => {
  delete req.session.user;
  await new Promise((resolve, reject) => {
    req.session.destroy(function (err) {
      if (err) return reject(err);
      return resolve()
    });
  });
  res.clearCookie('sid');
  res.end();
}
