const express=require('express');
// import { userlogin,register } from "../controllers/usercontroller.js";
const controller=require('../controllers/usercontroller.js')


const router =new express.Router();

router.post("/login", controller.userlogin);

router.post("/register",controller.register);

module.exports=router;
