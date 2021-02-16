const db = require("./db");

// todo: all, create
// done: 

exports.all = async (req, res) => {
  // TODO if cached retrieve cache else cache
  db.select().from("follows").where("userId", req.user.id).then((follows) => {
    return follows.map((follows) => {
      return follows.followId;
    });
  }).then((follows) => {
    return db.select().from("posts").whereIn("userId", follows).then((posts) => {
      return posts.map((post) => {
        return post;
      });
    }).then((posts) => {
      res.status(200).json(posts);
    });
  });
}

exports.create = async (req, res) => {
  let { ...post } = req.body;
  post.userId = req.user.id;
  post.timestamp = Date.now();
  db.insert(post).into("posts").then((rows) => {
    post.id = rows[0];
    res.status(200).json(post);
  });
}
