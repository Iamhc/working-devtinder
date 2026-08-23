const User = require("../config/model");
const bcrypt=require('bcrypt');
const validate = require("validator");
const express=require('express');
const authRouter=express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    if (!validate.isEmail(req.body.email)) {
      throw new Error("invalid email");
    }

    const depassword = await bcrypt.hash(req.body.password, 10);
    const userData = new User({ ...req.body, password: depassword });

    await userData.save();
    res.send("data saved");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports=authRouter;