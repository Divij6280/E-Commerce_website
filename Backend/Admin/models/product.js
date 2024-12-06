const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({

    name:{type:String , required:true},
    category:{type:String , required:true},
    image_url:{type:String , required:true},
    new_price:{type:Number , required:true},
    old_price: {type:Number , required:true},

})

module.exports=mongoose.model("product",productSchema)