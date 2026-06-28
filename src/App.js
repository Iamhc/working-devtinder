const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Hello, World!");
});

/* app.get("/home",(req,res)=>{
    const {name,age}=req.query;
    res.send({name:name,age:18,city:"New York"});
}) */
/* app.get(/.*fly$/,(req,res)=>{
    res.send("welcome to home page");
}) */
app.get("/home",(req,res,next)=>{
    next(); 
},
(req,res,next)=>{
    next();
},
(req,res)=>{
    res.send("welcome");
})
app.get("/about",r1,[r2],r3);
function r1(req,res,next){
    console.log("r1 is created");
    next();
}
function r2(req,res,next){
    console.log("r2 is created");
    next();
}
function r3(req,res,next){
    console.log("r3 is created");
    res.send("welcome to about page");
}
app.post("/home",(req,res)=>{
    res.send("post request to home page.");
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");  
});

/* git add .   
git commit -m "changes made in the code" 
git push -u origin main */