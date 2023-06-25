
import express, { response } from 'express'
import mongoose from'mongoose'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
const DATABASE=process.env.DATABASE;
const EMAIL=process.env.EMAIL;
const PASSWORD=process.env.PASSWORD;
import nodemailer from 'nodemailer'
// const BASE_URL=process.env.BASE_URL;


const app=express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


let startword=0;


const timeInterval = 30*60*1000;

setInterval(function () {
  sendmail();
//    demo();

}, timeInterval);

// const demo=()=>{
//      console.log('demo file running');
// }
 

const sendmail=async(req,res)=>{
    try { 
        console.log('sendmail called');
        const recipients=await Subscribe.find();  
        // console.log(antData[0].email)
        const allantData=await AdAntonym.find();
        const allsynData=await AdSynonym.find();
        console.log(allantData.length);
        console.log(startword);
        if(startword+2>allantData.length || startword+2>allsynData.length){
            startword=0;
        }
        console.log(startword)
        
        const filtereddata=allantData.slice(startword,startword+2)
        const filtereddata2=allsynData.slice(startword,startword+2)
        // console.log(filtereddata);
        const emailHTML = `
        <html>
          <body>
               
            <h1> Here are 1 antonyms of the day</h1>
            <h3>${filtereddata[0]?.word}:${filtereddata[0]?.antonym}</h3>
            <h3>${filtereddata[1]?.word}:${filtereddata[1]?.antonym}</h3>
            <br/>
             <h1> Here are 1 synonym of the day</h1>
             <h3>${filtereddata2[0]?.word}:${filtereddata2[0]?.synonym}</h3>
             <h3>${filtereddata2[1]?.word}:${filtereddata2[1]?.synonym}</h3>
          </body>
        </html>
      `;

        const transporter=nodemailer.createTransport({
           service:"gmail",
           auth:{
             user:EMAIL,
             pass:PASSWORD
           }
        });

        for (let i = 0; i < recipients.length; i++) {
            const recipient = recipients[i].email;

        const mailOptions={
         from:'vivekr4400@gmail.com',
         to: recipient ,
         subject:'Word of the Day',
         html:emailHTML
        }

        transporter.sendMail(mailOptions,(error,info)=>{
         if(error){
             console.log("error",error)
         }
         else{
             console.log("Email sent" + info.response);
             res.status(201).json({status:201,info})
         }
        })
    }

   } catch (error) {
    //   res.status(401).json({status:401,error})
      console.log(error)
   }

   startword+=2;
}




mongoose.connect(DATABASE,{
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
    console.log(email,password)
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
            //subscribe

    const subscribeSchema=new mongoose.Schema({
            email:String,
               
            }
            )  
            
       const Subscribe=new mongoose.model('Subscribe',subscribeSchema)  
       
       app.post('/subscribe',(req,res)=>{
        const {email}=req.body
         console.log(email);
        

    //   console.log(email);
        Subscribe.findOne({email:email},(err,user)=>{
            if(user){
                res.send({message:"user already subscribed"})
            }
            else{
                const subscribe=new Subscribe({email})
                subscribe.save(err=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send({ message :"Successfully Subscribed "})
                    }
                })
            }
        }
        
        
        
        )

       })

// adding antonyms


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
        console.log(antData);
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
     res.json("server getting started on localhost")
})
                     // admin 


      const antomymAdminSchema  =new mongoose.Schema({
          word:String,
          antonym:String
      })      
      
      const AdAntonym=new mongoose.model('AdAntonym',antomymAdminSchema)
 
     app.post('/addallantonyms',(req,res)=>{
        const {word,antonym}=req.body;
         console.log(word,antonym);
  const Adantonym=new AdAntonym({
       word,antonym
  })
  Adantonym.save(err =>{
    if(err) res.send(err)
   else res.send({message:'New Word Added'})

 })

     })  
     
     
    app.get('/getallantonyms',async(req,res)=>{

        try {

            const allantonymData=await AdAntonym.find();
            res.status(201).json(allantonymData)
            // console.log(allantonymData);
        } catch (error) {
            res.status(404).json(error)
        }


    }) 





    const synonymAdminSchema  =new mongoose.Schema({
        word:String,
        synonym:String
    })      
    
    const AdSynonym=new mongoose.model('AdSynonym',synonymAdminSchema)

   app.post('/addallsynonyms',(req,res)=>{
      const {word,synonym}=req.body;
    //    console.log(word,antonym);
const Adsynonym=new AdSynonym({
     word,synonym
})
Adsynonym.save(err =>{
  if(err) res.send(err)
 else res.send({message:'New Word Added'})

})

   })  

   app.get('/getallsynonyms',async(req,res)=>{

    try {

        const allsynonymData=await AdSynonym.find();
        res.status(201).json(allsynonymData)
        // console.log(allantonymData);
    } catch (error) {
        res.status(404).json(error)
    }


}) 




app.listen(process.env.PORT || 9000 ,()=>{
    console.log('app is running on 9000');
})