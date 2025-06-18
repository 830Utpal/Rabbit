const mongoose =require("mongoose");
const dotenv=require("dotenv");
const Product=require("./models/Product");
const User=require("./models/User");
const Cart=require("./models/Cart");
const Products= require("./data/products");

dotenv.config();

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});

const seedData=async()=> {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();


        // Create an admin user
        const adminUser = new User({
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            isAdmin: true
        });

        //Assign the default user ID to each product
        const createdUser = await adminUser.save();
        const userID = createdUser._id;


        const sampleProducts = Products.map((product) => {return{...product, user: userID}});
            
        
        await Product.insertMany(sampleProducts);
       

        console.log("Data seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();