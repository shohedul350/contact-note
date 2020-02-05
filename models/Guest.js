const mongoose=require('mongoose');
const Schema=mongoose.Schema

const GuestSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true 
    },

    dietary:{
        type:String,
        required:true,
        default:'Non-Veg'
    },


    isconfirmed:{
        type:Boolean,
        default:false
    }



});


const Guest = mongoose.model('Guest',GuestSchema)
module.exports=Guest