const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride = require("method-override");
const {v4:uuidv4}=require("uuid");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Purushottam",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"Shivam",
        content:"Hard work is important for success",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();

    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    console.log(post);
    res.render("show.ejs",{post});

});
app.patch("/posts/:id",(req,res)=>{
   let { id } = req.params;
   console.log(req.body.content);
   console.log(id);
   if (!req.body || !req.body.content) {
       return res.status(400).send("Content missing");
    }
    let newContent=req.body.content;
    console.log(newContent);


    

    let post = posts.find((p) => id===p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("editform.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
    
})

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})