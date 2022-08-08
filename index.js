// Import the express library
const express = require("express");
// Create application server object/ create express server
const app = express();
// Declare mongo db object
const mongooes = require("mongoose");
// Import env files
const dotenv = require("dotenv");
// Import routes
const userRoute = require("./routes/userRouter");
const orderRoute = require("./routes/orderRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRouter");
// Configure environment file
dotenv.config();
// Use json object in application we've to add this
// Request body comes as a stream, so we have to convert in json
app.use(express.json())
// To avoid cors error


// Connect with mongo db
// Async call back function
// To protect this string, move into .env file
//  "mongodb+srv://MuhammadUsama:8K4aDIxq969K54I1@cluster0.tka9ywh.mongodb.net/shop?retryWrites=true&w=majority" 
mongooes
.connect(process.env.MONGO_URL)
.then(()=>console.log("Db connection successfull!"))
.catch((err)=>console.log(err));

// Get Call Request, to test its working or not
app.get("/",(req,res)=>{
    // req coming from frontend
    // res send back to requester
    res.send("Hello Usama");
    console.log("test is successfull");
});

// Use different routes
app.use("/users",userRoute);
app.use("/cart",cartRoute);
app.use("/orders",orderRoute);
app.use("/products",productRoute);

// To run this application we've to specify port number
// 2nd parameter is call back function
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Back end working");
})