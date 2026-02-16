const mongoose=require("mongoose");
const Chart=require("./models/chart.js");

main()
 .then(()=>{
    console.log("Database Connected");
 })
 .catch((err)=>{
    console.log(err);
 })
 
 
 async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChart = [
    {
        from: "Rahul",
        to: "Aman",
        message: "Did you complete the assignment?",
        created_at: new Date(),
    },
    {
        from: "Neha",
        to: "Priya",
        message: "I will send it in the evening",
        created_at: new Date(),
    },
    {
        from: "Sneha",
        to: "Rohit",
        message: "Are you coming to college tomorrow?",
        created_at: new Date(),
    },
    {
        from: "Aman",
        to: "Rahul",
        message: "Yes, almost done 👍",
        created_at: new Date(),
    },
    {
        from: "Rohit",
        to: "Sneha",
        message: "Yes, see you at 10 AM",
        created_at: new Date(),
    },
        {
        from: "Kunal",
        to: "Priya",
        message: "Can you share the notes?",
        created_at: new Date(),
    },
    {
        from: "Neha",
        to: "Sneha",
        message: "Did you attend today's lecture?",
        created_at: new Date(),
    },
    {
        from: "Aman",
        to: "Kunal",
        message: "I'll send the PDF soon",
        created_at: new Date(),
    }
];


Chart.insertMany(allChart);