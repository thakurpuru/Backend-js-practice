const express=require("express");
const app=express();

const port=8080;
app.use(express.urlencoded({extended:true}));
app.get("/register",(req,res)=>{
    let {user,pwd}=req.query;
    res.send(`Standard get request Wlecome! ${user}`);
});

app.post("/register",(req,res)=>{
    let {user,pwd}=req.body;
    res.send(`Standard POST request Wlecome! ${user}`);
});

app.listen(port,()=>{
    console.log(`Listening at ${port}`);
});