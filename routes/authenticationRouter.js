const router = require("express").Router();
const authenticationController = require("../controllers/authenticationController")

router.post("/register", authenticationController.registerAdmin)

module.exports = router;