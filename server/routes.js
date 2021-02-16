const { Router } = require("express");
const router = module.exports = Router();
const userController = require("./user-controller");

router.get("/", (req, res) => res.send((new Date()).toLocaleString()))
router.get("/users/", userController.all)
router.post("/users/", userController.create)
router.get("/users/:id", userController.get)
router.patch("/users/:id", userController.update)
router.post("/users/:id", userController.update)
router.delete("/users/:id", userController.destroy)
