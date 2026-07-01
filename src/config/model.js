const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        validate(value){
            if(value<18){
                throw new Error("age must be greater than 18");
            }
        }
    },
    about:{
        type:String,
        default:"Hey there! I am using Devtinder"
    },
    hobbies:{
        type:[String],
    }
 });
module.exports=mongoose.model('User',userSchema);