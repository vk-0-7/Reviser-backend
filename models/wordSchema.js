const mongoose = require('mongoose');

const allSentWordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    antonym: {
        type: String,
        required: true,
    },
    synonym: {
        type: String,
        required: true,
    },
    example: {
        type: String,
        required: true,
    },
    createdAt: Date
})

const Sentdata = new mongoose.model("Sentdata", allSentWordSchema)

// module.exports = Sentdata;


const questionschema = new mongoose.Schema({
    question: [String],
    option1: [String],
    option2: [String],
    option3: [String],
    option4: [String],
    answer: [String],
    createdAt:Date,
})

const QuestionData = new mongoose.model("QuestionData", questionschema)

module.exports = {Sentdata,QuestionData};
