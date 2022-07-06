const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/eatmate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {
  console.log(`connection with db is successfull`)
})
  .catch((err) => {
    console.log(err)
  })

  //VAedd2dfbe8b7709c0578cb61376698e05   ,  AC16ee3a1a993726cc99afda86756fefa9   Account sid , auth token 6e110be386021756d0ff21c1c4ef3581