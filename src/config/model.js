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
        trim:true,
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
        },
        max:[50,"why this high age?"],
    },
    about:{
        type:String,
        default:"Hey there! I am using Devtinder"
    },
    ProfilePic:{
        type:String,
        default:"https://as1.ftcdn.net/v2/jpg/01/26/91/78/1000_F_126917812_XlWgkaV9f81Hde4wvmvJWM3huJRvy5EM.jpg"
    },
    hobbies:{
        type:[String],
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                 throw new Error("gender must be male,female or others");
            }
        }
    }
 },
    {timestamps:true});
module.exports=mongoose.model('User',userSchema);