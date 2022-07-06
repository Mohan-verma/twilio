require('dotenv').config()
const express = require('express')

require('./src/db/conn')
const { OTP } = require('./src/schema/phone')
const PORT = process.env.PORT || 5000;
const path = require('path');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);


app = express();
app.use(express.json())


app.get("/", (req, res) => {
  res.send("THIS IS BACKEND TESTING")
})

app.post("/login", (req, res) => {
  const number = "+919780319256";
  const chann = "sms";
  client
    .verify
    .services()
    .verifications
    .create({ to: number, channel: chann })
    .then(data => console.log(data))
  /*client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .verifications
             .create({to: '+15017122661', channel: 'sms'})
             .then(verification => console.log(verification.status));*/

})

app.post("/verify", (req, res) => {
  const number = "+919780319256";
  const code = "sms";
  client
    .verify
    .services()
    .verificationsChecks
    .create({ to: number, channel: chann })
    .then(data => console.log(data))
  /*client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .verifications
             .create({to: '+15017122661', channel: 'sms'})
             .then(verification => console.log(verification.status));*/

})

app.listen(PORT, () => {
  console.log(`you are listening to the ${PORT}`)
})