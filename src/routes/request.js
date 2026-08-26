const express=require("express")
const router=express.Router();
const connectionRequest=require("../config/newConnectionreq");

const middleware=require("./middleware");

router.post("/request/:status/:toUserId",middleware,async (req,res)=>{   
    try{
     const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const ALLOWED_UPDATES=["INTERESTED","IGNORED"]

    if(!ALLOWED_UPDATES.includes(status)){
     throw new Error("Not allowed")
    }
    const Connection=new connectionRequest({
    toUserId,
    fromUserId,
    status
 })
   await Connection.save();
   res.send("connection done");
    }
    catch(err){
    res.status(400).send(err.message);
    }
   
}
 
)
module.exports=router;