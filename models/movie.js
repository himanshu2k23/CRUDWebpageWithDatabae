const mongoose=require('mongoose');

const commentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    comment:String
})