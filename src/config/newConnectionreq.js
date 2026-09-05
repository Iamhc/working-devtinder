const mongoose=require("mongoose");
const connectionSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
         ref:"User"
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

  connectionSchema.index({fromUserId:1,toUserId:1})
module.exports=mongoose.model('connectionRequest',connectionSchema)