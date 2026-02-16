const express=require("express");
const app=express();
const ExpressError=require("./ExpressError");
app.use("/api",(req,res,next)=>{
    let {token}=req.query;
    if(token==="acess"){
        return next();
    }
    throw new ExpressError(401,"ACCESS DENIED!");
});

app.get("/",(req,res)=>{
    res.send("I am root");
});
app.get("/api",(req,res)=>{
    res.send("api route");
});

app.get("/err",(req,res)=>{
    abcd=abcd;
})
app.use((err,req,res,next)=>{
    let {status=500,message="Some Error occured"}=err;
    console.log("-----Error-----");
    res.status(status).send(message);
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
});