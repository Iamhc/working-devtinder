const express=require("express");
const validate=require("validator");
const app=express();
app.use(express.json());
const jwt=require('jsonwebtoken');
const database=require('./config/database');
const User=require("./config/model");
const cookieparser=require('cookie-parser');

app.use(cookieparser());
app.post("/signup",async (req,res)=>{
    const userData=new User(req.body);

    try{
        if(validate.isEmail(req.body.email)){
        await userData.save();
     
        res.send("data saved");
        }
        else{
            throw new Error("invalid email");
        }
        
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
    
});
app.post("/login",async (req,res)=>{
    const userData=new User(req.body);
    try{
    User.findOne({email:req.body.email,password:req.body.password}).then((data)=>{
        if(data){
            const token=jwt.sign({password:data.password},"PASSWORD_KEY");
            res.cookie("token", token);
            res.send("login successful"); 
        }
        else{
            res.status(400).send("invalid credentials");
        }
    });
}
        
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
    
});

app.get("/getData",async(req,res)=>{
   
    try{
    if(req.cookies.token){
            const token=req.cookies.token;
            const decoded=jwt.verify(token,"PASSWORD_KEY");
            User.findOne({password:decoded.password}).then((data)=>{
            if(data){
            res.send(data); 
             }
            else{
            res.status(400).send("invalid credentials");
            }
    });
} 
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
})
app.delete("/delete",async(req,res)=>{
    await User.findOneAndDelete({email:req.body.email});
    res.send("data deleted");
});
app.patch("/update",async(req,res)=>{
    try{
    const ALLOWED_UPDATES=["class","email","Age","password","about","ProfilePic","hobbies","gender"];
    Object.keys(req.body).forEach((key)=>{
     if(!ALLOWED_UPDATES.includes(key)){
        throw new Error("invalid updates");
     }
    }) 
    await User.findOneAndUpdate({email:req.body.email},{...req.body});
    res.send("data update");
    console.log("data updated");
}
     catch(err){
        res.status(400).send(err.message);
     }
})

database().then(()=>{
    console.log("db connected");
    app.listen(3000,()=>{
    console.log("server is running on the port 3000");  
});
    }).catch((err)=>{
        console.log("database not connected");
        console.log(err);
    });


 


/* git add .   
git commit -m "changes made in the code" 
git push -u origin main */
