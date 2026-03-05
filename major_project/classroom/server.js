const express=require("express");
const session=require("express-session");
const app=express();

app.use(session({
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true
}));

app.get("/test",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`your session coun${req.session.count}`);
})



app.listen(3000,()=>{
    console.log("Listening on port 3000");
});