const express=require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const User = require("../config/model");
const middleware = require("./middleware");

router.patch("/updatepassword",middleware,async(req,res)=>{
try{const {oldpassword,newpassword}=req.body;
const isMatch = await bcrypt.compare(oldpassword, req.user.password);
if (!isMatch) {   // agar match NAHI hua, tabhi error throw karo
  throw new Error("wrong password");
}
const hashedpassword=await bcrypt.hash(newpassword,10)
await User.findOneAndUpdate({_id:req.user._id},{password:hashedpassword})
res.send("password reset")
}
catch (err) {
    res.status(400).send(err.message);
  }
})

module.exports=router;