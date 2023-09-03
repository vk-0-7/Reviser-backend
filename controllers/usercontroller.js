
const { User, Subscribe } = require("../models/userSchema.js");
// const sendnewemail = require('../utils/sendemail.js')
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const nodemailer = require('nodemailer');

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

exports.usersubscribe = (req, res) => {
  try {
    const { email } = req.body;
    Subscribe.findOne({ email: email }, (err, user) => {
      if (user) {
        res.status(404).send({ message: "user already subscribed" });
      } else {
        const subscribe = new Subscribe({ email })
        subscribe.save((user) => {
          if (user) {
            res.send({ message: "Successfully Subscribed " })
            sendnewemail(email)
          } else {
            res.send({ message: "error while subscribing" })

            // console.log();
          }
        });
      }
    });
  } catch (error) {
    console.log('error while subscribing', error)
  }
}


exports.getsubsciber = (req, res) => {
  try {
    const email = req.query.email;
    //  console.log(req.query.email);
    Subscribe.findOne({ email: email }, (err, user) => {

      if (user) {
        res.status(200).json(user)
      }
      else {
        res.status(202).json({ message: "subscriber not found" })
      }

    })


  } catch (error) {
    console.log('error finding Subscribers', error)
  }

}

//get all subscribers is for admin page
exports.getallsubsciber = async (req, res) => {
  try {
    //  const email=req.query.email;
    //  console.log(req.query.email);
    const subscribers = await Subscribe.find()
    res.status(200).json(subscribers)

  } catch (error) {
    console.log('error finding Subscribers', error)
  }

}


const sendnewemail = (email) => {
  console.log("this is email", email)
  try {


    const emailHTML = `
  <html> 
    
  <body>

    <h2>Welcome buddy</h2>
   <p>
    You are Subscribed to wordMinder. 
   </p>
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

    const mailOptions = {
      from: "vivekr4400@gmail.com",
      to: email,
      subject: "Welcome to WordMinder",
      html: emailHTML,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent" + info.response);

      }
    });

  } catch (error) {
    console.log(" error occured in email send function", error);
  }

}
