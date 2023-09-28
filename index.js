const express = require("express")
const bodyParser = require("body-parser");
require("dotenv").config();
const authenticationRouter = require("./routes/authenticationRouter")
const userRouter = require("./routes/userRouter")
const app = express();

app.use(bodyParser.json())
app.use("/", authenticationRouter)
app.use("/user", userRouter)

const PORT = process.env.port || 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`)
})