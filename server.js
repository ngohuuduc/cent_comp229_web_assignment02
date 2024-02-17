require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.database_url)


const db = mongoose.connection
db.on('error',(error) => console.error(error) )
db.once('open',(error) => console.log('connected to DB !!') )


app.use(express.json())

const productsRouter = require('./routes/products')
app.use('/products',productsRouter)




app.listen(3000, () => console.log("server has been started on port 3000 , dont worry !"))