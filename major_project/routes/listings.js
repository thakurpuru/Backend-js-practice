const express=require("express");
const wrapAsync=require("../Utils/wrapAsync.js");
const ExpressError=require("../Utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn}=require("../middlewere");

const router=express.Router();

const validateListing=(req,res,next)=>{
    
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
//index route
router.get("/",wrapAsync(async(req,res)=>{
        let AllListing=await Listing.find(); 
        res.render("./listings/index.ejs",{AllListing});
    })
);
// new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs");
});

// show route
router.get("/:id",wrapAsync(async(req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id).populate("reviews");
        if(!listing){
            req.flash("error","Listing you requested does not exist");
            return res.redirect("/listings");
        }
        res.render("./listings/show.ejs",{listing});

    })
);

//create route
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
        const listing=new Listing(req.body.listing);
        listing.owner=req.user._id;
        await listing.save(); 
        req.flash("succes","New Listing Created");
        res.redirect("/listings");
    })
);

// edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
        let {id} =req.params;
        const listing=await Listing.findById(id);
        res.render("./listings/edit.ejs",{listing});
    })
);


//update route
router.put("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
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
        req.flash("succes","Listing Updated");
        res.redirect(`/listings/${id}`);

    })
);

// delete route
router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
        let {id} =req.params;
        await Listing.findOneAndDelete({_id:id}).then((res)=>{
            console.log(res);
        });
        req.flash("succes","Delete successfully");
        res.redirect("/listings");
    })
);

module.exports=router;
