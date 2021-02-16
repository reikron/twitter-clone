const { Router } = require("express");
const router = module.exports = Router();
const userController = require("./user-controller");
const postController = require("./post-controller");
const sessionController = require("./session-controller");
const followController = require("./follow-controller");

//router.get("/", (req, res) => res.send((new Date()).toLocaleString()))

router.use(sessionController.middleware)
router.post("/sessions/", sessionController.create)
router.delete("/sessions/", sessionController.destroy)

router.get("/users/", userController.all)
router.post("/users/", userController.create)
router.get("/users/:id", userController.get)
router.patch("/users/:id", userController.update)
router.post("/users/:id", userController.update)
router.delete("/users/:id", userController.destroy)

router.get("/posts/", postController.all)
router.post("/posts/", postController.create)

// relation: user-follow-user
router.get("/follows/:followId", followController.follow)
