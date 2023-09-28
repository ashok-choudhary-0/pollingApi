const router = require("express").Router();
const userController = require("../controllers/userController")
const authenticationController = require("../controllers/authenticationController")
const { validateToken, isAdmin } = require("../middlewares/userMiddleware")

router.get("/list", [validateToken, isAdmin], userController.getAllUsers)
router.get("/:id", [validateToken, isAdmin], userController.getSingleUser)
router.post("/create", [validateToken, isAdmin], authenticationController.createNormalUser)
router.delete("/:id", [validateToken, isAdmin], userController.deleteSingleUser)

module.exports = router;