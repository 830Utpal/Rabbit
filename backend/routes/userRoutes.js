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

      //create jwt payload
      const payload ={user:{id:user._id,role:user.role}};

      //sign and return the token along with user data

      jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
        if(err) throw err;

        //send the user and token in response

        res.status(201).json({
          user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
          },token
        })
      });
    }catch(error){
     console.log(error);
     res.status(500).send("Server error");
    }
})

//@route POST /api/users/login
//@desc authenticate
//@access public


module.exports=router;