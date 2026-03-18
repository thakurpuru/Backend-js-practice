const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport = require("passport");
const { svaeRedirectUrl } = require("../middlewere");


router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});

router.post("/signup",async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
        let registerUser=await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("succes","Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    }catch(er){
        req.flash("error",er.message);
        res.redirect("/user/signup");
    }

    
});

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
});

router.post("/login",svaeRedirectUrl,passport.authenticate("local",{failureRedirect:"/user/login",failureFlash:true}) ,(req,res)=>{
    req.flash("succes","Welcome back to Wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings"; 
    console.log(redirectUrl);
    res.redirect(redirectUrl);
});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("succes","You are logged out");
        res.redirect("/listings");
    });
});
module.exports=router;