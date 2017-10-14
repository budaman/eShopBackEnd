const express = require('express')
const path = require('path')
const bodyParser = require ('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')


//connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database)
//onConnect
mongoose.connection.on('connected', () => {
  console.log('connected to database ' + config.database)
})
//Error
mongoose.connection.on('error', (err) => {
  console.log('error occured' + err)
})

//routes
const users = require('./routes/users')
const products = require('./routes/products')
const orders = require('./routes/orders')

const app = express()
app.use(cors()) //allowing forengt enndpoints/api
app.use(bodyParser.json())
const port  = process.env.PORT || 3000

//passport Middleware
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

//routes conf
app.use('/users', users)
app.use('/products', products)
app.use('/orders', orders)

//Set Static folder
app.use(express.static(path.join(__dirname, "public")))




app.get('*', (req, res) => { //jei yra vedamas adresas, kuris neagzistuoja, tuomt peradresevimas vyksta i index.hml
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, ()=> {
  console.log('server started on ' + port )
})
