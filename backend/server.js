const express=require ("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const userRoutes=require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes");
const checkoutRoutes=require("./routes/checkoutRoutes");
const orderRoutes=require("./routes/orderRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const subscriberRoutes=require("./routes/subscriberRoute");


const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();



const PORT=process.env.PORT || 3000;

//connect to db
connectDB();

app.get("/",(req,res)=>{
    res.send("Welcome");
})

//API Routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api",subscriberRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})