const dotenv = require('dotenv')
const http = require('http')
const Event = require('events')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const e = new Event()

dotenv.config({path : './.env'})

require('./db/dbconn')

// e.once('hi', () => console.log("HI THERE"))
// e.emit('hi')
// app.use((_, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
app.use(cors())
app.use(express.json())
// We make router auth file to link our routes
app.use('/', require('./routes/auth'))
app.use('/feed', require('./routes/feed'))
const middleWare = (req, res, next) => {
    console.log("HI")
    next()
}

const port = process.env.PORT
// const server = http.createServer((req, res) => {
//     if(req.url == '/')
//     {
//         res.writeHead(200, {'content-type':'text/html'})
//         res.end("Hello, Welcome")
//     }
// })

// server.listen(port, () => {
//     console.log(`Server is listening at port ${port}`)
// })

// const se = http.createServer()

// se.on("request", (req, res) => {
//     console.log(req.url)
//     const rstream = fs.createReadStream("inputs.txt")
//     // rstream.on('data', data => {
//     //     res.write(data)
//     // })
//     // rstream.on('end', () => {
//     //     res.end()
//     // })
//     // rstream.on('error', err => {
//     //     console.log(err)
//     //     res.end('File not found')
//     // })
//     rstream.pipe(res)
// })

// se.listen(port)

// app.get('/',middleWare, (req, res) => {
//     // res.end("hi")
//     res.json({
//         hi : "hi"
//     })
// })

app.listen(port)

// const  = `mongodb+srv://jay:tfdTZOHsvZjntnzL@cluster0.cerfa.mongodb.net/?retryWrites=true&w=majority`

// const connectionParams={
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     useUnifiedTopology: true 
// }

// const connection = async () => {
//     try{
//         const data = await mongoose.connect(db,connectionParams)
//         console.log("Connection Successfull")
//     }catch(err){
//         console.log(err)
//     }
// }

// connection()

// const data = new mongoose.Schema({
//     username : String,
//     password : String
// })


// const Mod = mongoose.model("data", data);

// const firstData = new Mod({
//     username : "RAJ",
//     password : "SHARBAT"
// })

// firstData.save()