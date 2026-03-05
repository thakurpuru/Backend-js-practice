const mongoose=require("mongoose");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

main().then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Database connection failed",err);
});

// const userSchema=mongoose.Schema({
//     username:String,
//     addreses:[
//          {
//             location:String,
//             city:String,
//          },
//     ],
// });

// const User=mongoose.model("User",userSchema);
// const addUser=async()=>{
//     let User1=new User({
//         username:"Sheralokesh",
//         addreses:[
//             {
//                 location:"221B Baker street",
//                 city:"Londan"
//             }
//         ]
//     });
//     User1.addreses.push({location:"P32 Wallstreet",city:"Londan"});
//     let result=await User1.save();
//     console.log(result);
// }

// addUser();


const orderSchema=mongoose.Schema({
    item:String,
    price:Number
});


const customerSchema=mongoose.Schema({
    name:String,
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
});

customerSchema.post("findOneAndDelete",async(customer)=>{
    if(customer.orders.length){
        let res=await Order.deleteMany({_id:{$in:customer.orders}});
        console.log(res);
    }
});
const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

const findCustomer= async()=>{
    let res= await Customer.find({}).populate("orders");
    console.log(res[0]);
}

// findCustomer();
const addCustomer= async()=>{
    let cust1=new Customer({
        name:"karan Kumar"
    });
    const order1=new Order({
        item:"Pizza",
        price:250
    });
    cust1.orders.push(order1);
    await order1.save();
    let res= await cust1.save();
    console.log(res);
}
// addCustomer();

// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("Pre Middlewere");
// });



const dleCust=async()=>{
    let res=await Customer.findByIdAndDelete({_id:'6999904035ea945f19d81b17'});
    console.log(res);
}

dleCust();

const addOrder=async()=>{
    let res= await Order.insertMany([
        {item:"Samosas",price:12},
        {item:"Chips",price:10},
        {item:"Chocaletes",price:40},
    ]);
    console.log(res);
}
// addOrder();

const userschema=mongoose.Schema({
    username:String,
    email:String
});

const postSchema=mongoose.Schema({
    content:String,
    like:Number,
    user:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const User=mongoose.model("User",userschema);
const Post=mongoose.model("Post",postSchema);

const addData=async()=>{
    let user1=new User({
        name:"rahulkumar",
        email:"rahul@gamil.com"
    });
    let post1=new Post({
        content:"Hello World",
        like:7
    });
    post1.user=user1;
    await user1.save();
    let res=await post1.save();
    console.log(res);
}
// addData();