const express=require("express");
const wrapAsync=require("../Utils/wrapAsync.js");
const ExpressError=require("../Utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");

const router=express.Router({mergeParams:true});

const validateReview=(req,res,next)=>{
    // console.log(req.body);
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

// create reviews
router.post("/",validateReview,wrapAsync(async(req,res)=>{
        let {id}=req.params;
        let listing=await Listing.findById({_id:id});
        let newReview=new Review(req.body.review);
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        
        res.redirect(`/listings/${id}`);
    })
);

// delete reviews
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
        let {id}=req.params;
        let {reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.deleteOne({_id:reviewId});
        res.redirect(`/listings/${id}`);
    })
);

module.exports=router;