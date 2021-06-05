const router = require('express').Router()
const User = require('../models/User');
const Room = require('../models/Room');
const Message = require('../models/Message');

router.post('/newconversation', async (req, res) => {
    //Validate Info
    // const {error} = registerValidation(req.body)
    // if (error) return res.status(400).send(error.details[0].message)

    //Check if user exists
    const user = await User.findOne({username: req.body.recipientUsername})
    if (!user) return res.status(400).send('User does not exist')

    const room_id = req.body.currentUserEmail + "!" + user.email

    //Create a room and store in database
    const room = new Room({
        number: room_id,
        users: [req.body.currentUserId, user._id],
        messages: []
    })

    try {
        const savedRoom = await room.save()
        res.status(200).json({room_id: room_id, recipientId: user._id})
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/retrieveConversations', async (req, res) => {
    
    const conversations = await Room.find({users: req.body.currentUserId})
    
    try {
        res.json({conversations: conversations})
    } catch (err){
        res.status(400).send(err)
    }
})

router.post('/newmessage', async (req, res) => {
    
    const message = new Message({
        room: req.body.chatroom, 
        author: req.body.author, 
        message_body: req.body.message_body
    })

    try {
        const savedMessage = await message.save()
        res.status(200).send(savedMessage)
    } catch (err) {
        res.status(400).send(err)
    }

    // await Room.deleteMany({})
    // await Message.deleteMany({})

})

router.post('/retrieveMessages', async (req, res) => {
    const messages = await Message.find({})

    try {
        res.json({messages: messages})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/deleteMessage', async(req, res) => {
    
    const _id = req.body._id
    try {
        await Message.deleteOne({_id: _id})
        res.json({message: "successfully deleted"})
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;