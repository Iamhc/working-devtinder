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

    const founduser=req.user.findOne({
        _id:toUserId
    })
    if(founduser){
        throw new Error("no user found")
    }
    if(!ALLOWED_UPDATES.includes(status)){
     throw new Error("Not allowed")
    }

    const check=await connectionRequest.findOne({
        $or:[
            {toUserId,fromUserId},
            {toUserId:fromUserId,fromUserId:toUserId}
        ]
    });
    if(check){
     throw new Error("exists already");
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