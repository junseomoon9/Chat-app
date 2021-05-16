const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: { origin: "*"}})


const router = express.Router()
app.use(router)

router.get("/", (req, res) => {
    res.send({response: "I am alive"}).status(200)
})

io.on('connection', (socket) => {
    console.log("User connected: " + socket.id)


    socket.on("message", (data) => {
        socket.broadcast.emit('message', data)
    })

    socket.on("disconnect", (data) => {
        socket.broadcast.emit('endmessage', {socketid: socket.id})
        console.log(socket.id + "has disconnected")
    })


})


server.listen(3001, () => {
    console.log('Server runing...')
})