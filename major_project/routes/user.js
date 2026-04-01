const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport = require("passport");
const { svaeRedirectUrl, isloginWithGoogle } = require("../middlewere");

const userController=require("../controllers/user.js");

router.get("/signup",userController.renderSingUpForm);

router.post("/signup",userController.userSingUp);

router.get("/login",userController.renderLoginForm);

router.post("/login",svaeRedirectUrl,isloginWithGoogle,passport.authenticate("local",{failureRedirect:"/user/login",failureFlash:true}),userController.userLogin);

router.get("/logout",userController.userLogout);


router.get("/auth/google",
    passport.authenticate("google",{scope:['profile','email']}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: "/user/signup"
  }),
  userController.googleCallback
);

module.exports=router;