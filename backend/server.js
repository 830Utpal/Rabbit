const express=require ("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");

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

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
    ;
})