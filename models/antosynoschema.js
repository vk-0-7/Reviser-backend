const mongoose = require("mongoose");

const antoSchema = new mongoose.Schema({
  word: String,
  antonym: String,
  email: String,
});

const Dictionary = new mongoose.model("Dictionary", antoSchema);
// module.exports=Dictionary;

const synoSchema = new mongoose.Schema({
  word: String,
  synonym: String,
  email: String,
});

const Synonym = new mongoose.model("Synonym", synoSchema);


module.exports={Dictionary,Synonym};
