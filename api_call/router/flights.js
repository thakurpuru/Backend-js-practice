const router=require("express").Router()

const { getJson } = require("serpapi");


router.get("/search",async(req,res)=>{
    try{
        const {from,to,date,r_date}=req.query;

        const params = {
            engine: "google_flights",
            departure_id: from,
            arrival_id: to,
            outbound_date: date,
            type: 2,
            currency: "INR",
            hl: "en",
            gl: "in",
            api_key: process.env.SERP_API_KEY
            };

            getJson(params, (json) => {

            if (json.error) return res.status(400).json(json);

            const allFlights = [
                ...(json.best_flights || []),
                ...(json.other_flights || [])
            ];

            const flights = allFlights
                .sort((a,b)=>a.price-b.price)
                .map(f => ({
                airline: f.flights[0].airline,
                price: f.price,
                duration: f.total_duration,
                departure: f.flights[0].departure_airport.time,
                arrival: f.flights.at(-1).arrival_airport.time,
                stops: f.layovers?.length || 0
                }));

            res.json(flights);
        });

    }catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports=router; 
