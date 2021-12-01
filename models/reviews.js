const mongoose= require("mongoose");

const reviewSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    }
})

const Reviews = mongoose.model('reviews', reviewSchema);

module.exports.Reviews = Reviews;
