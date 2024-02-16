require('dotenv')
const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://ducngo:helloworld@cluster0.232lfkg.mongodb.net/Marketplace?retryWrites=true&w=majority', {useNewUrlParser: true })
db.on()


app.listen(3000, () => console.log("server has been started on port 3000 , dont worry so much!"))