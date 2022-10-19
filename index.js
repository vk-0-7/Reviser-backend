import express from 'express'
import mongoose from'mongoose'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();


const app=express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const DB=process.env.DATABA

mongoose.connect(DB,{
    usenewUrlParser:true,
    useUnifiedTopology:true
},()=>{console.log("connected to DB");})


const userSchema=new mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
}
)
const User=new mongoose.model('User',userSchema)







app.post("/login" ,(req,res) =>{
    const {email,password} =req.body
    User.findOne({email:email} ,(err,user) =>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successfull",user:user})
            } 
            else{
                res.send({message:"password incorrect"})
            }
        }
        else{
            res.send({ message:"User not registered"})
        }
    })
})

                //Register

app.post("/register" ,(req,res) =>{  
  const {username,name ,email,password} = req.body
  User.findOne({
      email:email
  },(err,user)=>{
      if(user){
          res.send({message:"User already exist"})
      }
      else
         { 
              const user =new User({
      username,name,email,password
   })
   user.save(err => {
       if(err) {
           res.send(err)
       } else{
           res.send({ message :"Successfully Registered ,Now you can Login"})
          
       }
   })
   
}  
     
  })
})


const userschema=new mongoose.Schema({
    word:String,
    antonym:String,
    email:String,
})
const Dictionary=new mongoose.model('Dictionary',userschema)

app.post('/addantonyms',(req,res) =>{
    const {word,antonym,email}=req.body
    
    const dictionary=new Dictionary({
        word,antonym,email
    })
    dictionary.save(err =>{
        if(err) res.send(err)
        else res.send({message:"New word Added"})
    })

})

app.get('/getantonyms',async(req,res) =>{
    try {

        const antData=await Dictionary.find();
        res.status(201).json(antData)
        // console.log(antData);
    } catch (error) {
        res.status(404).json(error)
    }
})


const Userschema=new mongoose.Schema({
    word:String,
    synonym:String,
    email:String,
})
const Synonym=new mongoose.model('Synonym',Userschema)

app.post('/addsynonyms',(req,res)=>{
    const{word,synonym,email}=req.body

    const synonyms=new Synonym({
        word,synonym,email
    })
    synonyms.save(err =>{
       if(err) res.send(err)
      else res.send({message:'New Word Added'})

    })
})

app.get('/getsynonyms',async(req,res) =>{
    try {

        const synData=await Synonym.find();
        res.status(201).json(synData)
        console.log(synData);
    } catch (error) {
        res.status(404).json(error)
    }
})

app.get('/',(req,res) => {
     res.json("server start")
})



app.listen(process.env.PORT || 9000 ,()=>{
    console.log('app is running on 9000');
})