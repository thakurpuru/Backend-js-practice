const Listing=require("../models/listing.js");

module.exports.index=async(req,res)=>{
    let AllListing=await Listing.find(); 
    res.render("./listings/index.ejs",{AllListing});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});

}
module.exports.createListing=async(req,res,next)=>{
    const listing=new Listing(req.body.listing);
    listing.owner=req.user._id;
    await listing.save(); 
    req.flash("succes","New Listing Created");
    res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>{
    let {id} =req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}

module.exports.updateListing=async(req,res)=>{
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

}

module.exports.deleteListing=async(req,res)=>{
    let {id} =req.params;
    await Listing.findOneAndDelete({_id:id}).then((res)=>{
        console.log(res);
    });
    req.flash("succes","Delete successfully");
    res.redirect("/listings");
}