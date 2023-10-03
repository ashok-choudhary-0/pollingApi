const express = require("express")
const bodyParser = require("body-parser");
require("dotenv").config();
const authenticationRouter = require("./routes/authenticationRouter")
const userRouter = require("./routes/userRouter")
const pollRouter = require("./routes/pollRouter")
const app = express();

app.use(bodyParser.json())
app.use("/", authenticationRouter)
app.use("/user", userRouter);
app.use("/poll", pollRouter)

// const vote = require("./models/voteModel");
// vote.sync({ alter: true });
// const option = require("./models/optionsModel")
// option.sync({ alter: true })

const PORT = process.env.port || 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`)
})