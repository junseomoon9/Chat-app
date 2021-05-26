const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    room: String,
    author: mongoose.ObjectId,
    message_body: String,
    created_at: {type: Date, default: Date.now}

    
})

module.exports = mongoose.model('Message', messageSchema, 'messages')