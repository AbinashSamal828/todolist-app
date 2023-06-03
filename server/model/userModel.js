const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const User=mongoose.model('USER',userSchema);
module.exports=User;