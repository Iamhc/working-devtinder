const User = require("../config/model");
const bcrypt=require('bcrypt');
const express=require('express');

const authRouter=express.Router();
const jwt = require("jsonwebtoken");



authRouter.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });

    if (data && (await bcrypt.compare(req.body.password, data.password))) {
      // JWT Secret inside .env
      const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.send("login successful");
    } else {
      res.status(400).send("invalid credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports=authRouter;