const mongoose=require('mongoose');
const authSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        }
    },{timestamps:true}
)
const AuthModel = mongoose.model('User',authSchema)
module.exports=AuthModel