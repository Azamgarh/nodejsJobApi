const User = require('../models/userModel');
const {StatusCodes}  = require('http-status-codes');
const {UnauthenticatedError}  = require('../errors');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerdemo = (req, res) => {
    res.json({
        success: true,
        message: "API inner running 🚀"
    });
};


const register = async (req, res)=>{
    try{
 const{name, email, password}= req.body;
if(!name){
return res.status(400).json({msg:'Name is required',  success: false,})
}
if(!email){
return res.status(400).json({msg:'Email is required',  success: false,})
}
if(!password){
return res.status(400).json({msg:'password is required',  success: false,})
}

const existingUser = await User.findOne({ email });
if (existingUser){
    return res.status(400).json({msg:'Email already exists',  success: false,})
}

const passwordHash = await bcrypt.hash(password, 10);

const user = await User.create({name, email, password:passwordHash});

const token = jwt.sign({id:user._id, name:user.name}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LEFETIME});

res.status(201).json({msg:'User create successfull', success: true, data:{id:user._id, name:user.name}, token:token});

    }
    catch(error){
res.status(500).json({msg:'Internal server error', error,  success: false,});

    }
   
}
const login = async (req, res)=>{
try{
const {email, password} = req.body;

if(!email){
    return res.status(400).json({msg:'Email is required', success:false})
}
if(!password){
    return res.status(400).json({msg:'password is required', success:false})
}

const user = await User.findOne({email});

if(!user){
    throw new UnauthenticatedError("Inavalid email and password"); 
}
const isPasswordCorrect = await  bcrypt.compare(password, user.password)
if(!isPasswordCorrect){
    return res.status(401).json({msg:'Password is incorrect', success:false});
}
const token = jwt.sign({id:user._id, name:user.name}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LEFETIME});
res.status(201).json({msg:'Login successfull', success: true, data:{id:user._id, name:user.name}, token:token});
}
 catch(error){
res.status(500).json({msg:'Internal server error', error,  success: false,});

    }
}

module.exports ={
    register,
    login,
    registerdemo
}