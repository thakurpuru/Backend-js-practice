const express=require("express");
const cors=require("cors");
require("dotenv").config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/airports",require("./router/airports"));
app.use("/api/flights",require("./router/flights"));

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})