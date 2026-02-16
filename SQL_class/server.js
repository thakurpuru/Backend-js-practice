const express=require("express");
const ejs=require("ejs");
const path = require("path");
const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const {v4:uuidv4}=require("uuid");
const mathodOverrid=require("method-override");
const { error } = require("console");
const app=express();
const port=8080;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(mathodOverrid("_method"));
app.use((req, res, next) => {
    res.locals.query = req.query;
    next();
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root#7764',
    database: 'test_db',
});

db.connect((err)=>{
    if(err){
        console.log("Database connection error",err);
    }else{
        console.log("Database connection succesfully");
    }
})
// function createRandomUser() {
//     return [
//         uuidv4(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password(),
        
//     ];
// }

// let users=[];

// for(let i=0;i<100;i++){
//     users.push( createRandomUser());
// }

// db.end();

app.get("/",(req,res)=>{
    db.query("SELECT * FROM user",(err,result)=>{
        if(err) throw err;
        res.render("show.ejs",{result});
    });
});

app.get("/:id/edit",(req,res)=>{
    let {id}=req.params;
    res.render("loginform.ejs",{id,error: null });

});
app.post("/:id/login",(req,res)=>{
    let {id}=req.params;
    let passW=req.body.password;
    db.query("SELECT * FROM user WHERE id=?",[id],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
           return res.render("loginform.ejs", {id, error: "User Not found" });
        }
        if(result[0].password===passW){
            return res.render("editform.ejs",{result:result[0]});
        }
        return res.render("loginform.ejs", {id, error: "Wrong password" });
    
    });
});
app.patch("/:id/edit",(req,res)=>{
    let {id}=req.params;
    let usrname=req.body.username;
    db.query("UPDATE user SET username=? where id=?",[usrname,id],(err,result)=>{
        if(err) throw err;
        res.redirect("/");
    });

});

app.get("/user/new",(req,res)=>{
    res.render("new.ejs");

});

app.post("/user/new",(req,res)=>{
    let id=uuidv4();
    let user=[id,req.body.username,req.body.email,req.body.password];
    db.query("INSERT INTO user(id,username,email,password)  values (?,?,?,?)",user,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.redirect("/");
    });
});

app.get("/:id/delete",(req,res)=>{
    let {id}=req.params;
    res.render("deleteform.ejs",{id,error:null});
    
});

app.delete("/:id/delete",(req,res)=>{
    let {id}=req.params;
    let password=req.body.password;
    db.query("SELECT * FROM user WHERE id=?",[id],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            return res.render("deleteform.ejs",{id,error:"User not found"});
        }
        if(password===result[0].password){
            db.query("DELETE FROM user WHERE id=?",[id],(err,result)=>{
                if(err) throw err;
                console.log(result)
                return res.redirect("/?msg=deleted");
            });
        }else{
            return res.render("deleteform.ejs",{id,error:"Wrong password"});

        }

    });
    
});
app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})