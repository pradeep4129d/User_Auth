const AuthModel =require('../models/auth-model.js')

const jwt=require('jsonwebtoken')
const signup = async(req,res)=>{
    const {username,password}=req.body;
    const newuser=new AuthModel({username,password})
    try {
        await newuser.save();
        const user=await AuthModel.findOne({username,password})
        const token=jwt.sign({id:user._id},'authentication-token')
        res.status(201).json({success:true,token:token})
    } catch (error) {
        res.status(401).json({success:false,msg:error.message})
    }
}
const signin=async(req,res)=>{
    const {username,password}=req.body;
    try {
        const userdata = await AuthModel.findOne({username,password})
        if(userdata){
            const token=jwt.sign({id:userdata._id},'authentication-token')
            res.status(201).json({success:true,token:token})
        }
        else{
            res.status(401).json({success:false,msg:'user not found'})
        }
    } catch (error) {
        res.status(401).json({success:false,msg:error.message})
    }
}
const getuser=async(req,res)=>{
    console.log(req.userId)
    try {
        const userdata = await AuthModel.findOne({_id:req.userId})
        if(userdata){
            res.status(201).json({success:true,userdata:userdata})
        }
        else{
            res.status(401).json({success:false,msg:'user not found'})
        }
    } catch (error) {
        res.status(401).json({success:false,msg:error.message})
    }
}
module.exports={
    signup,signin,getuser
}