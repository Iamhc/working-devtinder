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
        required:true,
        enum:{
            values:["INTERESTED","REJECTED","ACCEPTED","IGNORED"],
            message:`{VALUE} not in values`
        }
    }
},
  { timestamps: true });
module.exports=mongoose.model('connectionRequest',connectionSchema)