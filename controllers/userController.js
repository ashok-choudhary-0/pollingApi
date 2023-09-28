const userModel = require("../models/userModel")
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.findAll()
    res.status(200).send(allUsers)
  } catch (err) {
    res.status(500).send(err)
  }
}
const getSingleUser = async (req, res) => {
  const userId = req.params.id
  try {
    const dbUser = await userModel.findOne({ where: { id: userId } })
    if (dbUser) {
      res.status(200).send(dbUser);
    } else {
      res.status(401).send({ message: "User not found or incorrect userId, please check the userId" })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { getAllUsers, getSingleUser }