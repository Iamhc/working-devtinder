const mongoose=require("mongoose");
const connectionSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["INTERESTED","REJECTED","ACCEPTED","NOT INTERESTED"],
            message:`{values} not in values`
        }
    }
});
module.exports=mongoose.model('connectionRequest',connectionSchema)