const mongoose=require("mongoose");

const chartSchema=mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    }
});

const Chart=mongoose.model("Chart",chartSchema);

module.exports=Chart;