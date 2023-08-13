const express = require("express");

const controller = require("../controllers/antosynocontroller.js");


const router = new express.Router();

router.get("/getallsentword", controller.getallsentwords);

router.post("/createallsentword", controller.storesentdata);


router.post("/addwords", controller.addwordsFunc);

router.get("/data/getantonyms", controller.getantoFunc);

router.post("/addsynonyms", controller.addSynofunc);

router.get("/data/getsynonyms", controller.getSynoFunc);

router.post("/createQuestions",controller.Questioncreator);

router.get("/getQuestions",controller.QuestionReceiver);

module.exports = router;
