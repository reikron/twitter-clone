const db = require("./db");

exports.follow = async (req, res) => {
  let userId = req.user.id;
  let followId = req.params.followId;
  db.insert({ userId, followId }).into("follows").then((rows) => {
    res.status(200).json({});
  });
}
