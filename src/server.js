const express = require("express");
const dotnev = require("dotenv");
dotnev.config();
const cors = require("cors");
const port = process.env.PORT;
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", registerRoute);
app.use("/auth", loginRoute);

app.listen(port, () => {
  console.log("server is running on port:", port);
});
