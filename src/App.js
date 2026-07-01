const express=require("express");

const app=express();
app.use(express.json());

const database=require('./config/database');
const User=require("./config/model");

app.post("/signup",async (req,res)=>{
    const userData=new User(req.body);
    try{
        await userData.save();
     res.send("data saved");
    }
    catch(err){
        console.log(err);
        res.status(500).send("error occurred");
    }
    
});
app.get("/getData",async(req,res)=>{
    const data=await User.find({Age:19});
    res.send(data);
})
app.delete("/delete",async(req,res)=>{
    await User.findOneAndDelete({email:"dummy@gmail.com"});
    res.send("data deleted");
});
app.patch("/update",async(req,res)=>{
    await User.findOneAndUpdate({email:"dummy@gmail.com"},{name:"hc",Age:50});
    res.send("data updated");
    console.log("data updated");
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
