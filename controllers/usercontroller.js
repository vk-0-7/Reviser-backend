
const {User,Subscribe} = require("../models/userSchema.js");


// Login Api

exports.userlogin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "password incorrect" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
};

//Register Api

exports.register = (req, res) => {
  const { username, name, email, password } = req.body;
  User.findOne(
    {
      email: email,
    },
    (err, user) => {
      if (user) {
        res.send({ message: "User already exist" });
      } else {
        const user = new User({
          username,
          name,
          email,
          password,
        });
        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Registered ,Now you can Login" });
          }
        });
      }
    }
  );
};

exports.usersubscribe=(req,res)=>{
  try {
     const {email}=req.body;
     Subscribe.findOne({ email: email }, (err, user) => {
      if (user) {
        res.status(404).send({ message: "user already subscribed" });
      } else {
        const subscribe = new Subscribe({ email });
        subscribe.save((err) => {
          if (err) {
            res.send({message:"error while subscribing"});
          } else {
            res.send({ message: "Successfully Subscribed " });
          }
        });
      }
    });
  } catch (error) {
    console.log('error while subscribing',error)
  }
}


exports.getsubsciber=(req,res)=>{
  try {
       const email=req.query.email;
      //  console.log(req.query.email);
      Subscribe.findOne({email:email},(err,user)=>{
       
         if (user){
          res.status(200).json(user)
        }
         else{
          res.status(202).json({message:"subscriber not found"})
         }
       
      })


  } catch (error) {
       console.log('error finding Subscribers',error)
  }  

}
exports.getallsubsciber= async (req,res)=>{
  try {
      //  const email=req.query.email;
      //  console.log(req.query.email);
     const subscribers= await Subscribe.find()
      res.status(200).json(subscribers)

  } catch (error) {
       console.log('error finding Subscribers',error)
  }  

}

