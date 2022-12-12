const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://akshay:akshaysuman@cluster0.mar6h4j.mongodb.net/mySeconddb?retryWrites=true&w=majority");

const userSchema=mongoose.Schema({

    taskname:String,
    status:String,
    tag:String,
})

const Usermodel=mongoose.model("user",userSchema)

module.exports={connection,Usermodel}