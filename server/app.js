require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./dB/conn");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
const routes = require("./router/auth");
//schema
const User = require("./model/userSchema");

//router
app.use(routes);

app.get("*", (req, res) => {
  res.send("err0r 404");
});
app.listen("5000", () => {
  console.log("connected at 5000");
});
