const express=require("express");
const path=require("path");
const mysql=require("mysql2");
const fs=require("fs");
const multer  = require('multer')
require("dotenv").config();
const app=express();
const port=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

const db=mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

db.connect((err)=>{
  if(err){
    console.error("Error Connecting to Mysql",err);
  }else{
    console.log("Connected to mysql databse");
  }
});

app.get("/",(req,res)=>{
    db.query("SELECT * FROM images ORDER BY uploaded_at DESC",(err,result)=>{
      if(err){
        console.log(err);
        return res.send("Database error");
      }
      res.render("index.ejs",{images:result});
    })
})
app.post("/profile",upload.single("photo"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const filepath=req.file.path.replace(/\\/g, "/");;
    db.query("INSERT INTO images (path) VALUES(?)",[filepath],(err,result)=>{
      if(err){
        console.log(err);
        return res.send("Database Error");
      }
      res.redirect("/");
    });
});

app.post("/delete/:id",(req,res)=>{
    const id=req.params.id;
    db.query("SELECT path FROM images WHERE id=?",[id],(err,result)=>{
        if(err){
          console.log(err);
          return res.send("database error");
        }
        if(result.length===0){
          return res.send("image not found");
        }
        const filepath=result[0].path;
        fs.unlink(filepath,(err)=>{
            if(err){
              console.log("File delete error",err);
            }

            db.query("DELETE FROM images WHERE id=?",[id],(err,result)=>{
                if(err){
                  console.log("DB error in delete",err);
                  return res.send("DB delete error");
                }
                res.redirect("/");
            });

        });
    });
});
app.listen(port,()=>{
    console.log(`Listenin on ${port}`);
})
