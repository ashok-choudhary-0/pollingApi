const router = require("express").Router();
const userController = require("../controllers/userController")
const { validateToken, isAdmin } = require("../middlewares/userMiddleware")

router.get("/list", [validateToken, isAdmin], userController.getAllUsers)

module.exports = router;