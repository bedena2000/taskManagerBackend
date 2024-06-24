const express = require("express");
const dotnev = require("dotenv");
dotnev.config();
const cors = require("cors");
const port = process.env.PORT;
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const createBoardRouter = require('./routes/board/create');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/Auth');

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", registerRoute);
app.use("/auth", loginRoute);

app.use('/board', verifyToken, createBoardRouter);

app.listen(port, () => {
  console.log("server is running on port:", port);
});
