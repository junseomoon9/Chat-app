const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: { origin: "*"}})


const router = express.Router()
app.use(router)

router.get("/", (req, res) => {
    res.send({response: "I am alive"}).status(200)
})

server.listen(3001, () => {
    console.log('Server runing...')
})

io.on('connection', (socket) => {
    console.log("User connected: " + socket.id)

    // socket.on("join-room", (data) => {
    //     socket.join(1);
    //     console.log("User Joined Room: " + 1);
    //   });

    socket.on("send-message", (data) => {
        socket.broadcast.emit('receive-message', data)
        //socket.to(1).emit("send-message", data);
        console.log("message sent")
    })

    

    socket.on("disconnect", (data) => {
        
        console.log(socket.id + "has disconnected")
    })


})


