const express=require("express");
const wrapAsync=require("../Utils/wrapAsync.js");
const ExpressError=require("../Utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");

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
router.get("/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

// show route
router.get("/:id",wrapAsync(async(req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id).populate("reviews");
        res.render("./listings/show.ejs",{listing});

    })
);

//create route
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
        const listing=new Listing(req.body.listing);
        await listing.save(); 
        res.redirect("/listings");
    })
);

// edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
        let {id} =req.params;
        const listing=await Listing.findById(id);
        res.render("./listings/edit.ejs",{listing});
    })
);


//update route
router.put("/:id",wrapAsync(async(req,res)=>{
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

    })
);

// delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
        let {id} =req.params;
        await Listing.findOneAndDelete({_id:id}).then((res)=>{
            console.log(res);
        });
        res.redirect("/listings");
    })
);

module.exports=router;
