const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  Mobile: {
    type: Number,
    required: true,
  },
});
const MessageBox = mongoose.model("MASSEGE", messageSchema);

module.exports = MessageBox;
