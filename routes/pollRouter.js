const router = require("express").Router();
const pollController = require("../controllers/pollController")
const { validateToken, isAdmin } = require("../middlewares/userMiddleware")

router.post("/add", [validateToken, isAdmin], pollController.addNewPoll)
router.get("/list/:page", [validateToken], pollController.getPolls)
router.get("/:id", [validateToken], pollController.getSinglePoll)
router.patch("/:id", [validateToken, isAdmin], pollController.updateSinglePoll)
router.delete("/:id", [validateToken, isAdmin], pollController.deleteSinglePoll)

module.exports = router;