const mongoose=require("mongoose");
const express=require("express");
const path=require("path");
const app=express();
const methodOverride=require("method-override");
const Chart=require("./models/chart.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("root is working");
});

main()
 .then(()=>{
    console.log("Database Connected");
 })
 .catch((err)=>{
    console.log(err);
 })
 
 
 async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/charts",async(req,res)=>{
    let charts=await Chart.find();
    res.render("index.ejs",{charts});
});

app.get("/charts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/charts",(req,res)=>{
    let {from,to,message}=req.body;
    let newChart=new Chart({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
    });
    newChart.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/charts");
    

});

app.get("/charts/:id",async(req,res)=>{
    let {id}=req.params;
    let chart=await Chart.findById(id);
    res.render("edit.ejs",{chart});
});

app.get("/charts/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chart=await Chart.findById(id);
    res.render("edit.ejs",{chart});
});

app.put("/charts/:id",(req,res)=>{
    let {id}=req.params;
    let {message}=req.body;
    Chart.updateOne({_id:id},{message:message}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })

    res.redirect("/charts");
});

app.delete("/charts/:id",(req,res)=>{
    let {id}=req.params;
    Chart.deleteOne({_id:id}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/charts");
})

app.listen(8080,()=>{
    console.log("Listening on port 8080");
});




















//    const userSchema=new mongoose.Schema({
//       name:String,
//       email:String,
//       age:Number
//    });
   
//    const User=mongoose.model("User",userSchema);
   
   // const user2=new User({
   //     name:"Eva",
   //     email:"Evayahoo.in",
   //     age:48
   // });
   // user2
   //   .save()
   //     .then((res)=>{
   //         console.log(res);
   //     })
   //     .catch((err)=>{
   //         console.log(err);
   //     })
   
//    User.find({}).then((data)=>{
//       console.log(data);
//    });
   // User.updateOne({_id:'698213c2d36deda18ed29273'},{name:"Yahoo"}).then((res)=>{
   //     console.log(res);
   // }).catch((err)=>{
   //     console.log(err);
   // });
   
   // User.deleteOne({name:"Yahoo"}).then((res)=>{
   //     console.log(res);
   // });
   
   // User.insertMany([
   //     {name:"Tony",email:"tony@gmail.com",age:32},
   //     {name:"Bruce",email:"bruce@gmail.com",age:44},
   //     {name:"Peter",email:"peter@gmail.com",age:56},
   
   // ]).then((data)=>{
   //     console.log(data);
   // });