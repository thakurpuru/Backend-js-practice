const router=require("express").Router()
const Amadeus=require("amadeus");

const amadeus=new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

router.get("/search",async(req,res)=>{
    try{
        const {keyword}=req.query;

        const response = await amadeus.referenceData.locations.get({
            keyword,
            subType: "AIRPORT,CITY"
        });
        const airports = response.data.map(a => ({
            name: a.name,
            city: a.address.cityName,
            code: a.iataCode
        }));
        res.json(airports);
    }catch(err){
        res.status(500).json({error:err.massage});
    }
});
module.exports=router;
