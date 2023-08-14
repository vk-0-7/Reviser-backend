// import { Dictionary ,Synonym,Sentdata} from "../models/userSchema.js"
const { Dictionary, Synonym } = require('../models/antosynoschema.js')
const  {Sentdata,QuestionData} = require('../models/wordSchema.js')
const mongoose =require('mongoose')
// const QuestionData=require('../models/wordSchema.js')

exports.getallwords = async (req, res) => {

  try {
    const db = mongoose.connection.db;
    const allDataCollection = db.collection('allData');
    const allData = await allDataCollection.find().toArray();
    res.status(200).json(allData)


  } catch (error) {
    console.log('error receiving data',error)
    res.status(404).json(error)
  }
}
exports.getallsentwords = async (req, res) => {

  try {
    const sentData = await Sentdata.find();
    res.status(201).json(sentData);



  } catch (error) {
    console.log('error receiving data',error)
    res.status(404).json(error)
  }
}

exports.storesentdata = async (data) => {
  console.log('store word called', data);
  try {
    const { word, meaning, antonym, synonym, example } = data;
    let createdAt = new Date();
    // console.log(word,meaning,antonym,synonym,example,createdAt);
    const newsentdata = new Sentdata({
      word,
      meaning,
      antonym,
      synonym,
      example,
      createdAt,
    });
    const savedData = await newsentdata.save();
    // res.status(201).json(savedData);
    console.log("saved successfully", savedData);
  } catch (error) {
    console.log("error saving sentdata to mongoDB", error);
    // res.status(404).json(error);
  }
};

exports.Questioncreator =  (req, res) => {
  const { question, option1, option2, option3, option4 ,answer} = req.body.data;
  console.log(req.body.data);
  let createdAt = new Date();

  const questiondata = new QuestionData({
    question, option1, option2, option3, option4,answer,createdAt
  })
  questiondata.save(err=>{
     if(err) res.send(err)
     else res.send({message:"unable to send Question data"})
  })

}

exports.QuestionReceiver= async (req,res)=>{
  try {
    const Data = await QuestionData.find();
    res.status(200).json(Data);

  } catch (error) {
    // console.log('error receiving data',error)
    res.status(404).json(error)
  }
}



exports.addClientWords = async(req, res) => {
    try {
      const { word,meaning, antonym,synonym,example, email } = req.body

      const dictionary = new Dictionary({
        word,meaning, antonym,synonym,example, email
      })
    const data= await dictionary.save();
     res.status(201).json({data:data})

    } catch (error) {
      res.status(500).json({message:"error adding words"})
    }
    

}


exports.getClientWords = async (req, res) => {
  try {
    const clientWords = await Dictionary.find();
    res.status(201).json(clientWords);
    //   console.log(antData);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.addSynofunc = (req, res) => {
  const { word, synonym, email } = req.body;

  const synonyms = new Synonym({
    word,
    synonym,
    email,
  });
  synonyms.save((err) => {
    if (err) res.send(err);
    else res.send({ message: "New Word Added" });
  });
}

exports.getSynoFunc = async (req, res) => {
  try {
    const synData = await Synonym.find();
    res.status(201).json(synData);
    console.log(synData);
  } catch (error) {
    res.status(404).json(error);
  }
}