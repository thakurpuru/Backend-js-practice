// const express = require('express');
// const app = express();
// const port = 3000;
// // console.dir(app);
// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });
// // app.use((req,res)=>{
// //     console.log("request recived");
// // });
// app.get("/",(req,res)=>{
//     res.send("you contacted root path");
// });
// app.get("/main",(req,res)=>{
//     res.send("you contacted main path");
// });
// app.get("/:path(*)",(req,res)=>{
//     res.send("you contacted wrong path");
// });



const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;  // Now this will work

  console.log("Data received:", name, email, message);

  // Setup transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "purushottamthakur78@gmail.com", // your email
      pass: "Lakshmi#7764"         // your email password or app password
    }
  });

  let mailOptions = {
    from: email,
    to: "purushottamthakur78@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error sending message." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
