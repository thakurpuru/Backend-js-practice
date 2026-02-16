 const express=require("express");
 const app=express();

 const port=8080;

 app.set("view engine","ejs");

 app.get("/",(req,res)=>{
    res.render("home.ejs");
 });

app.get("/ig/:username",(req,res)=>{
    let follower=["adam","setve","bob"]
    let {username}=req.params;
    res.render("instagram.ejs",{username,follower});
    console.log(username);
})

 app.get("/rolldice",(req,res)=>{
    let data= Math.floor(Math.random()*6)+1;
    res.render("dice_roll.ejs",{num:data});
 });
 app.listen(port,()=>{
    console.log(`Listening on ${port}`);
 });

