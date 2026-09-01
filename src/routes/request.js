const express=require("express")
const router=express.Router();
const connectionRequest=require("../config/newConnectionreq");
const User = require("../config/model");

const middleware=require("./middleware");

router.post("/request/:status/:toUserId",middleware,async (req,res)=>{   
    try{
     const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const ALLOWED_UPDATES=["INTERESTED","IGNORED"]

    const founduser=await User.findOne({
        _id:toUserId
    })
    if(!founduser){
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
router.post("/requests/:status/:requestId",middleware,async(req,res)=>{
const loggeduser=req.user._id;
try{
const ALLOWED_STATUS=["ACCEPTED","REJECTED"];
if(!ALLOWED_STATUS.includes(req.params.status)){
throw new Error("Status corrupt");
}

const connectionFound=await connectionRequest.findOne({
_id:req.params.requestId,
toUserId:loggeduser,

});
const status=req.params.status;
connectionFound.status=status;
await connectionFound.save();
res.send("done status changed")
}
catch(err){
 res.status(400).send(err.message)
}
});

router.post("requests/getAllRequests",middleware,async (req,res)=>{
    connectionRequest.findAll({toUserId:req.user._id})
})
module.exports=router;