const router = require("express").Router();
const pollController = require("../controllers/pollController")
const { validateToken, isAdmin } = require("../middlewares/userMiddleware")

router.post("/add", [validateToken, isAdmin], pollController.addNewPoll)

module.exports = router;