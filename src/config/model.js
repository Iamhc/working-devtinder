const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    class:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    Age:{
        type:Number
    }
 });
module.exports=mongoose.model('User',userSchema);