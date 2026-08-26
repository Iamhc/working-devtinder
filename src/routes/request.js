const express=require("express")
const router=express.Router();
const connectionRequest=require("../config/newConnectionreq");

router.post("/request/:status/:toUserId",
 new connectionRequest({
    fromUserId:req.user._id,
    toUserId:toUserId,
    status:status
 }) 
)