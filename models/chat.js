const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const chatSchema = new mongoose.Schema({
  
    senderId: {
        type: ObjectID,
        required: true, 
        ref: 'User'
    }, 
    receiverId: {
        type: ObjectID,
        required: true, 
        ref: 'User'
    }, 
    text: {
        type: String
    } 
}, 
{ 
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;