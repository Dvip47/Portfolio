const express = require("express");
const router = express.Router();
require("../dB/conn");
const User = require("../model/userSchema");
const MessageBox = require("../model/messageSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

//usinng routuing  register
router.post("/register", async (req, res) => {
  const { name, email, Mobile, password, cpassword } = req.body;

  if (!name || !email || !Mobile || !password || !cpassword) {
    return res.status(422).json({ error: "Check All Property" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }

    const user = new User({ name, email, Mobile, password, cpassword });
    await user.save();
    res.status(201).json({ message: "Registation Successfulll" });
  } catch (err) {}
});

//login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill all the feild" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      //password match
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //token
      const token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ message: "Invalid password" });
      } else {
        res.json({ message: "user Sign in successfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid email" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about
router.get("/about", async (req, res) => {
  let data = await User.find({});
  return res.status(200).json({ success: true, message: data });
  // res.json({
  //   data,
  //   status: 200,
  //   message: "OK",
  // });
});

// contact
router.get("/contact", async (req, res) => {
  let data = await User.find({});
  return res.status(200).json({ success: true, message: data });
});
// message
router.post("/contact", async (req, res) => {
  const { name, email, Mobile, message1 } = req.body;
  console.log(req.body);
  if (!name || !email || !Mobile || !message1) {
    return res.status(403).json({ error: "Check all feild" });
  }
  try {
    const message = new MessageBox({ name, email, Mobile, message: message1 });
    await message.save();
    res.status(201).json({ message: "Message send Successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
