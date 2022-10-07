const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookie?.jwtoken;
    const verifyToken = jwt?.verify(
      token,
      "DCBJHCJCKMCAJNCKCMCNJDKMCKMSLCSJIKOCLJIOCM"
    );
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tookens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    return res.json({
      status: 401,
      message: "Invalid Token",
    });
  }
};
module.exports = authenticate;
