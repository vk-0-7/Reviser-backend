
const express=require('express');

const cors=require('cors');
// import dotenv from "dotenv";
require('dotenv').config();
// dotenv.config();
require('./db/conn.js')
const mongoose=require('mongoose');
const DATABASE = process.env.DATABASE;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
// import nodemailer from "nodemailer";
const nodemailer=require('nodemailer')
const userrouter=require('./routes/user.js');
const dictrouter=require('./routes/dictionary.js');
// const {storesentdata}=require('./controllers/antosynocontroller.js')
// import  {getallsentwords}  from "./controllers/wordcontroller.js";

const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());
app.use(userrouter);
app.use(dictrouter);

// let startword=0;

const timeInterval =  10* 1000;

// setInterval(() => {
//   sendmail();
//   // getallsentwords()
// }, timeInterval);





const sendmail = async () => {

  // const lastIndex = await Index.find();
  // let startword = lastIndex[lastIndex.length - 1]?.num;
   let startword=0;
  try {
    console.log("sendmail called");
    const recipients = await Subscribe.find();
  //  console.log(recipients);
    // console.log(antData[0].email)
    // const allwords =await allData.find();

    const db = mongoose.connection.db;
    const allDataCollection = db.collection('allData');
    const allData = await allDataCollection.find().toArray();
    // console.log('All data from the collection:', allData);

   
    // const allsynData = await AdSynonym.find();
    // console.log(allwords);
    // console.log(startword);
    // if (
    //   startword + 2 > allwords.length 
     
    // ) {
    //   startword = 0;
    // }
    // console.log(startword)

    const filtereddata =allData.slice(startword, startword + 2);
     storesentdata(filtereddata[0]);
     storesentdata(filtereddata[1]);
    // console.log(filtereddata);
    const emailHTML = `
        <html> 
          <body>
               
            <h2> Here are 2 word of the day</h2>
            <h4>Word:${filtereddata[0]?.word}</h4>
            <h4>Meaning:${filtereddata[0]?.meaning}</h4>
            <h4>Antonym:${filtereddata[0]?.antonym}</h4>
            <h4>Synonym:${filtereddata[0]?.synonym}</h4>
            <h4>Example:${filtereddata[0]?.example}</h4>
            <br/>
             
            <h4>Word:${filtereddata[1]?.word}</h4>
            <h4>Meaning:${filtereddata[1]?.meaning}</h4>
            <h4>Antonym:${filtereddata[1]?.antonym}</h4>
            <h4>Synonym:${filtereddata[1]?.synonym}</h4>
            <h4>Example:${filtereddata[1]?.example}</h4>
          </body>
        </html>
      `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i].email;

      const mailOptions = {
        from: "vivekr4400@gmail.com",
        to: recipient,
        subject: "Word of the Day",
        html: emailHTML,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Email sent" + info.response);
          // res.status(201).json({ status: 201, info });
        }
      });
    }
  }
   catch (error) {
     
    console.log(" error occured in email send function", error);
  }

  // startword += 2;

  // getIndex(startword);
};



const indexSchema = new mongoose.Schema({
  num: Number,
});

const Index = new mongoose.model("Index", indexSchema);

const getIndex = (currval) => {
  const index = new Index({ num: currval });

  index.save((error, savedUser) => {
    if (error) {
      console.error(error);
    } else {
      console.log("index set successfully:");
    }
  });
};








// //  const num=startword;

// // app.post("/login" ,userlogin)

// //Register

// //subscribe

const subscribeSchema = new mongoose.Schema({
  email: String,
});

const Subscribe = new mongoose.model("Subscribe", subscribeSchema);

app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  console.log(email);

  //   console.log(email);
  Subscribe.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already subscribed" });
    } else {
      const subscribe = new Subscribe({ email });
      subscribe.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Subscribed " });
        }
      });
    }
  });
});

// // adding antonyms

app.get("/", (req, res) => {
  res.json("server getting started on localhost");
});
// // admin

// const antomymAdminSchema = new mongoose.Schema({
//   word: String,
//   antonym: String,
// });

// const AdAntonym = new mongoose.model("AdAntonym", antomymAdminSchema);

// app.post("/addallantonyms", (req, res) => {
//   const { word, antonym } = req.body;
//   console.log(word, antonym);
//   const Adantonym = new AdAntonym({
//     word,
//     antonym,
//   });
//   Adantonym.save((err) => {
//     if (err) res.send(err);
//     else res.send({ message: "New Word Added" });
//   });
// });

// app.get("/getallantonyms", async (req, res) => {
//   try {
//     const allantonymData = await AdAntonym.find();
//     res.status(201).json(allantonymData);
//     // console.log(allantonymData);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// const synonymAdminSchema = new mongoose.Schema({
//   word: String,
//   synonym: String,
// });

// const AdSynonym = new mongoose.model("AdSynonym", synonymAdminSchema);

// app.post("/addallsynonyms", (req, res) => {
//   const { word, synonym } = req.body;
//   //    console.log(word,antonym);
//   const Adsynonym = new AdSynonym({
//     word,
//     synonym,
//   });
//   Adsynonym.save((err) => {
//     if (err) res.send(err);
//     else res.send({ message: "New Word Added" });
//   });
// });

// app.get("/getallsynonyms", async (req, res) => {
//   try {
//     const allsynonymData = await AdSynonym.find();
//     res.status(201).json(allsynonymData);
//     // console.log(allantonymData);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

app.listen(process.env.PORT || 9000, () => {
  console.log("app is running on 9000");
});
