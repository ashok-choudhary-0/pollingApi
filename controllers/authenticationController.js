const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const registerUser = async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword, email } = req.body;
  try {
    if (password === confirmPassword) {
      if (!firstName || !lastName || !username || !password || !confirmPassword || !email) {
        res.status(404).send({ message: "Please fill all the required fields" })
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const addUser = await userModel.create({ firstName, lastName, username, password: hashedPassword, email, isAdmin: true })
        res.status(200).send({ message: "User created successfully", addUser })
      }
    } else {
      res.status(401).send({ message: "Password and confirmPassword should be same" })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(404).send({ message: "Username or password can not be empty" })
    } else {
      const dbUser = await userModel.findOne({ where: { username } })
      if (dbUser) {
        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        if (passwordMatch) {
          const userAuthenticationToken = jwt.sign({
            data: `${username}+${password}+${dbUser.isAdmin}+${dbUser.id}`
          }, process.env.jwtSecKey, { expiresIn: '1h' });
          res.status(200).send({ dbUser, userAuthenticationToken })
        } else {
          res.status(401).send({ message: "Incorrect password, please check the password you entered" })
        }
      } else {
        res.status(404).send({ message: "User not found, please check the username" })
      }
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
const createNormalUser = async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword, email } = req.body;
  try {
    if (password === confirmPassword) {
      if (!firstName || !lastName || !username || !password || !confirmPassword || !email) {
        res.status(404).send({ message: "Please fill all the required fields" })
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const addNormalUser = await userModel.create({ firstName, lastName, username, password: hashedPassword, email })
        res.status(200).send({ message: "Normal user created successfully", addNormalUser })
      }
    } else {
      res.status(401).send({ message: "Password and confirmPassword should be same" })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { registerUser, loginUser, createNormalUser }