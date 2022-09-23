const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./router/userRouter");
const cors = require("cors");

dotenv.config({ path: ".env" });

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

const DB = process.env.DATABASE_URL;

mongoose.connect(DB, {}).catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(" DB Connected successfully");
});

app.listen(4000, () => {
  console.log("Server is runnig in port: 4000");
});
