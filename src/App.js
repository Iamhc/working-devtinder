const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Hello, World!");
});

app.get("/home",(req,res)=>{
    const {name,age}=req.query;
    res.send({name:name,age:18,city:"New York"});
})
/* app.get(/.*fly$/,(req,res)=>{
    res.send("welcome to home page");
}) */
app.post("/home",(req,res)=>{
    res.send("post request to home page");
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");  
});