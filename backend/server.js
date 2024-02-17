const connectDB = require("./config/db");
const port = process.env.PORT || 5000
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require("./middleware/errorMiddleware")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(errorHandler)

app.use('/api/blogs', require('./routes/blogRoutes'))


app.listen(port, ()=> console.log(`Server started on port ${port}`))