const express=require("express");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const path=require("path");
const cors=require("cors");
const listings=require("./routes/listings.js");
const reviews=require("./routes/reviews.js");

const app=express();

app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log("Db connection error",err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wander');
}




app.get("/",(req,res)=>{
    res.send("root link");
});

app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);




// app.all("/*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not found"));
// });
app.use((err,req,res,next)=>{
    console.dir(err);
    let {status=500,message="Something went wrong"}=err; 
    res.status(status).render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("Listening on port 8080");
});