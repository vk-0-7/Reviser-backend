
// const EMAIL = process.env.EMAIL;
// const PASSWORD = process.env.PASSWORD;
// const nodemailer=require('nodemailer');

// const sendnewemail=(email)=>{
//     console.log("this is email",email)
//   try {
    
 
//     const emailHTML = `
//     <html> 
      
//     <body>

//       <h2>Welcome buddy</h2>
//      <p>
//       You are Subscribed to wordMinder. 
//      </p>
//     </body>
//     </html>
//   `;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: EMAIL,
//       pass: PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: "vivekr4400@gmail.com",
//     to: email,
//     subject: "Welcome to WordMinder",
//     html: emailHTML,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("error", error);
//     } else {
//       console.log("Email sent" + info.response);
      
//     }
//   });

// } catch (error) {
//     console.log(" error occured in email send function", error);
// }

// }

// module.exports=sendnewemail;