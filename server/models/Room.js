const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        min: 6
    },
    users: [mongoose.ObjectId],
    messages: [{author: mongoose.ObjectId, message: mongoose.ObjectId}]

    
})

module.exports = mongoose.model('Room', roomSchema, 'rooms')