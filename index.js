const express=require("express");
require("dotenv").config()




const app=express();


const {connection,Usermodel}=require("./db")
app.use(express.json());
app.get("/",(req,res)=>{
   res.send("HomePage")
})



app.get("/todos",async(req,res) => {
  const param = req.query
  console.log(param);
  try{
  const users = await Usermodel.find(param)
   res.send(users)
  }
  catch(error){
  console.log(error)
  res.send({"error" : "error in loading..."})
  }
})


app.post("/create",async(req,res)=>{
    const payload=req.body;
    // console.log(payload);
    await Usermodel.insertMany([payload]);
    res.send("send successfully")
})

app.delete("/delete/:id",async(req,res)=>{
    const userid=req.params.id;
    console.log(userid);
    try{
        await Usermodel.findByIdAndDelete({"_id":userid})
        res.send("deleted successfully")
    }catch(err){
      console.log(err);
      res.send({"err":"something  went wrong,try again later"})
    }
    
})

app.patch("/edituser/:id",async(req,res)=>{
const id=req.params.id;
const payload=req.body;
try{
 const query= await Usermodel.findByIdAndUpdate({"_id":id},payload)
 console.log(query)
 res.send("update");
}catch(err){
  console.log(err);
  res.send({"err":"something  went wrong,try again later"})
}
})






app.listen(8000,async()=>{
    try{
        await connection;
        console.log("connect to db successfully")
    }catch(e){
        console.log("connection to db failed");
      console.log(e);
    }
   
   
    console.log("listen to port 9000");
})