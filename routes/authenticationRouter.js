const router = require("express").Router();
const authenticationController = require("../controllers/authenticationController")

router.post("/register", authenticationController.registerUser)
router.post("/login", authenticationController.loginUser)

module.exports = router;