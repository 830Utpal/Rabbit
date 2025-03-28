const express=require("express");
const User=require("../models/User");
const jwt=require("jsonwebtoken");

const router= express.Router();

//@route POST/api/users/register
//@desc register a new user
//@access public

router.post("/register",async(req,res)=>{
    const{name,email,password}=req.body;

    try{
       //registration logic
       let user=await User.findOne({email});

       if(user) return res.status(400).json({message:"User already exists"});

       user=new User({name,email,password});
       await user.save();

      res.status(201).json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
      })

    }catch(error){
     console.log(error);
     res.status(500).send("Server error");
    }
})

module.exports=router;