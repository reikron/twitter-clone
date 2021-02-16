const db = require("./db");
const { Role } = require("./user");
const crypto = require("crypto");

// todo: deactivate
// done: all, create, get, update, destroy

exports.all = async (req, res) => {
  db.select().from("users").then((users) => { // .where("role", "user") .where("active", "1")
    return users.map((user) => {
      //delete user.role;
      delete user.passwordHash;
      return user;
    });
  }).then((users) => {
    res.status(200).json(users);
  });
}

exports.create = async (req, res) => {
  let { password, ...user } = req.body;
  user.passwordHash = crypto.createHash("md5").update(password).digest("hex");
  user.role = Role.USER;
  user.timestamp = Date.now();
  db.insert(user).into("users").then((rows) => {
    user.id = rows[0];
    delete user.passwordHash;
    res.status(200).json(user);
  });
}

exports.get = async (req, res) => {
  db.select().from("users").where("id", req.params.id).then((users) => {
    return users.map((user) => {
      //delete user.role;
      delete user.passwordHash;
      return user;
    });
  }).then((users) => {
    if (users.length > 0) {
      res.status(200).json(users[0]);
    } else {
      res.status(200).json({});
    }
  });
}

exports.update = async (req, res) => {
  db("users").update(req.body).where("id", req.params.id).then((rows) => {
    res.status(200).json(rows);
  });
}

exports.destroy = async (req, res) => {
  db("users").where("id", req.params.id).del().then((rows) => {
    //console.log(rows);
    res.status(200).json([]);
    //res.status(200).json(rows);
  });
}

//exports.deactivate = async (req, res) => {

//}
// all, create, get, update, delete, deactivate
