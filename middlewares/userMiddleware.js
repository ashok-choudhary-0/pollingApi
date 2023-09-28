const jwt = require("jsonwebtoken")
const validateToken = (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    res.status(404).send({ message: "User authentication token not found" })
  } else {
    try {
      jwt.verify(token, process.env.jwtSecKey);
      next();
    } catch (err) {
      res.status(401).send({ message: "invalid/expired authentication token", err })
    }
  }
}
const isAdmin = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.jwtSecKey, (err, decoded) => {
    if (err) {
      res.status(500).send(err)
    } else {
      const userIsAdmin = decoded.data.split("+")[2]
      if (userIsAdmin === "true") {
        next();
      } else {
        res.status(401).send({ message: "You are not authorized for this request, only admins can access this" })
      }
    }
  });
}
module.exports = { validateToken, isAdmin }

