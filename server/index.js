const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: "*"})
var cors = require('cors')
app.use(cors())
const router = express.Router()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

app.use(router)

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('connected to db!')
})

// router.get("/", (req, res) => {
//     res.send({response: "I am alive"}).status(200)
// })

//Import Routes
const authRoute = require('./routes/auth')
const chatRoute = require('./routes/chat')

//Middleware
app.use(express.json())

//Route Middlewares
app.use('/', authRoute)
app.use('/chat', chatRoute)

server.listen(3001, () => {
    console.log('Server runing...')
})

io.on('connection', (socket) => {
    console.log("User connected: " + socket.id)

    socket.on("join-room", (data) => {
        socket.join(data.room_id);
        console.log("User Joined Room: " + data.room_id);
    });

    socket.on("create-room", (data) => {
        socket.broadcast.emit('create-room', data)
    })

    socket.on("send-message", (data) => {
        
        socket.to(data.room).emit("receive-message", data);
        console.log("message sent")
    })

    socket.on("delete-message", (data) => {
        socket.to(data.room).emit("delete-message", data);
        console.log("message deleted")
    })

    socket.on("disconnect", (data) => {
        console.log(socket.id + "has disconnected")
    })

})


