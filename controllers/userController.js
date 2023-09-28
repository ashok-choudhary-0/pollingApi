const userModel = require("../models/userModel")
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.findAll()
    res.status(200).send(allUsers)
  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { getAllUsers }