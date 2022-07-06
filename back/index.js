require('dotenv').config()
const express = require('express')

require('./src/db/conn')
const { OTP } = require('./src/schema/phone')
const PORT = process.env.PORT || 5000;
const path = require('path');
const { config } = require('process');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


app = express();
app.use(express.json())


app.get("/", (req, res) => {
  res.send("THIS IS BACKEND TESTING")
})


// sent opt to mobile number
app.post("/login", (req, res) => {
  const number = req.body.number;
  console.log(number.length)


  if (number.length >= 13) {
    console.log(req.body)
    const number = req.body.number;
    const chann = "sms";
    client
      .verify
      .services(process.env.SECURITY)
      .verifications
      .create({ to: number, channel: chann })
      // then statement twilio
      .then(data => {
        console.log(data)
        res.send("otp sent")
      })
      // error login invalid number
      .catch(err => {
        console.log(err)
        res.status(400).send("invalid format plz ensure that you have filled your country code as well as number ")
      })
  }

  else {
    console.log("number is invalid invalid format plz ensure that you have filled your country code as well as number")
    res.send("number is invalid invalid format plz ensure that you have filled your country code as well as number")
  }






})



// check verified code of number
app.post("/verify", (req, res) => {


  console.log(req.body)


  const number = req.body.number;

  const codes = req.body.code;

  console.log("THIS IS NUMBER", number, codes);

  client.verify.services(process.env.SECURITY)
    .verificationChecks
    .create({ to: number, code: codes })


    .then(verification_check => {
      console.log("hello", verification_check)


      if (verification_check.status === "pending") {
        res.send("invalid OTP generate otp again")
      }
      else {

        const otpdata = new OTP({
          user: req.body.number,
          status: verification_check.status,
        })
        otpdata.save()
          .then(response => {
            // const phone_id = response._id
            // console.log(phone_id)
            res.status(201).send({ Phone_id: response._id, message: "user save" })

          }).catch(err => {
            console.log(err)
          })
      }

    })
    //error verification
    .catch(err => {
      console.log(err)
      if (err.status === 404)
        res.send("invalid otp generate otp again")


    });


  /*client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .verifications
             .create({to: '+15017122661', channel: 'sms'})
             .then(verification => console.log(verification.status));*/

})

app.listen(PORT, () => {
  console.log(`you are listening to the ${PORT}`)
})