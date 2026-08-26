const express=require("express")
const router=express.Router();
const connectionRequest=require("../config/newConnectionreq");
const authRouter = require("./auth");
const middleware=require("./middleware");

router.post("/request/:status/:toUserId",authRouter,async (req,res)=>{   
    try{
     const toUser=req.user._id;
    const fromUser=req.params.toUserId;
    const status=req.params.status;
    const ConnectionRequest=new connectionRequest({
    toUser,
    fromUser,
    status
 })
   await ConnectionRequest.save();
   res.send("connection done");
    }
    catch(err){
    res.status(400).send(err.message);
    }
   
}
 
)
module.exports=router;