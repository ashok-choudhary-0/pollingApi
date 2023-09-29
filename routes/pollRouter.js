const router = require("express").Router();
const pollController = require("../controllers/pollController")
const { validateToken, isAdmin } = require("../middlewares/userMiddleware")

router.post("/add", [validateToken, isAdmin], pollController.addNewPoll)
router.get("/list/:page", [validateToken], pollController.getPagePolls)

module.exports = router;