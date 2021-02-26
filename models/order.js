const mongoose =  require('mongoose');
const {ObjectId} = mongoose.Schema;


const productsCartSchema =  new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"Product",
    },
    name:String,
    count:Number,


});

const productCart =  mongoose.model("ProuctCart",productsCartSchema)

const orderSchema = new mongoose.Schema({
    products:[productsCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }

},{timestamps:true});

const Order = mongoose.model("Order",orderSchema);

module.exports= {Order,productCart}
