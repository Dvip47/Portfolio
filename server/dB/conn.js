const mongoose = require("mongoose");
const DB =
  "mongodb+srv://Vipies:1234@cluster0.l2lpyev.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful to DB");
  })
  .catch((err) => {
    console.log("Not connected to DB ");
  });
