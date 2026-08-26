const mongoose=require("mongoose");
const connectionSchema=new mongoose.Schema({
    fromUserId:{
        types:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        types:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        types:String,
        enum:{
            values:["INTERESTED","REJECTED","ACCEPTED","NOT INTERESTED"],
            message:`{values} not in values`
        }
    }
});
module.exports=mongoose.model('connectionRequest',connectionSchema)