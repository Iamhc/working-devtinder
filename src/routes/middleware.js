const jwt = require("jsonwebtoken");
const User = require("../config/model");
const middleware= async (req, res,next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const data = await User.findOne({ _id: decoded._id });
      if (data) {
        req.user=data;
        next();
      } else {
        res.status(400).send("invalid credentials");
      }
    } else {
      res.status(400).send("token not found");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}
module.exports=middleware;