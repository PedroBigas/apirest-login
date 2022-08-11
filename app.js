require('dotenv').config();
const express = require ('express');
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
const adminRouter = require('./routes/adminRouter')

mongoose.connect(process.env.MONGO_CONNECT, (err) => {
    
    if(err) {
        console.log(err);
    } else {
        console.log("Mongo connected");
    }

})

const app = express()

app.use('/user',express.json(), userRouter)

app.use('/admin', express.json(), adminRouter)

app.listen(process.env.PORT, () => { console.log("Server Running") })