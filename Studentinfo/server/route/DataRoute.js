const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer"); 
dotenv.config();
const router = express.Router();

// Models
const usercollection = require("../model/DataSchema");

// Student data
router.route("/Student-data").post(async (req, res) => {
  try {
    const { name, email, dob, mm, cm, pm, cutoff, } = req.body;
    var percentage = parseFloat(cutoff / 3).toFixed(2); 
    // Create user data in the database
    const userdata = await usercollection.create({
      name: name,
      email: email,
      dob: dob,
      maths: mm,
      chemistry: cm,
      physics: pm,
      cutoff: cutoff
    });

    console.log(userdata);

    // var percentage =cutoff/3;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS, // provide your email address in .env file
        pass: process.env.EMAIL_PASSWORD //  provide your email id password (App password, note: note the real password)
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Result-Mark Cutoff Info',
      text: `Dear ${name},
             \nMarks:-
             \n1.Mathematics : ${mm}/100.
             \n2.Physics : ${pm}/100.
             \n3.Chemistry : ${cm}/100.
             \n4.Total cutoff : ${cutoff}/300.
             \n5.Percentage : ${percentage} %
             \nGood Luck!!!
             \nBest regards,\nXYZ University.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Failed to send email.",
          error: error
        });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({
          data: userdata,
          message: "Data saved to database & Email sent successfully.",
          status: 200,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: err
    });
  }
});

module.exports = router;
