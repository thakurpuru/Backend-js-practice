const express=require("express");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const path=require("path");
const Listing=require("./models/listing.js");
const cors=require("cors");

const app=express();

app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
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

app.get("/listings",async(req,res)=>{
    let AllListing=await Listing.find(); 
    res.render("./listings/index.ejs",{AllListing});
});

app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});

});

app.post("/listings",(req,res)=>{
    let {title,description,url,price,location,country}=req.body;
    const listing=new Listing({
        title:title,
        description:description,
        image:{
            url:url,
            filename:"default",
        },
        price:price,
        country:country,
        location:location
    });
    listing.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log("Error in post to save to db",err);
    });
    res.redirect("/listings");
});

app.get("/listings/:id/edit",async(req,res)=>{
    let {id} =req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

app.put("/listings/:id",async(req,res)=>{
    let {title,description,url,price,location,country}=req.body;
    let {id}=req.params;
    await Listing.updateOne({_id:id},{
        title:title,
        description:description,
        image:{
            url:url,
            filename:"default",
        },
        price:price,
        country:country,
        location:location
    });
    res.redirect(`/listings/${id}`);

});

app.delete("/listings/:id",(req,res)=>{
    let {id} =req.params;
    Listing.deleteOne({_id:id}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log("Error in Delete route",err);
    });
    res.redirect("/listings");
});

app.listen(8080,()=>{
    console.log("Listening on port 8080");
});