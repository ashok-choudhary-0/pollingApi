const express = require("express")
const app = express();
require("dotenv").config();
const userRouter = require("./routes/userRouter")
const bodyParser = require("body-parser");
app.use(bodyParser.json())

app.use("/", userRouter)

const PORT = process.env.port || 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`)
})