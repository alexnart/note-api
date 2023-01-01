const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const notificationsSchema = new mongoose.Schema({
  
    userId: {
        type: ObjectID,
        required: true, 
        ref: 'User'
    }, 
    text: {
        type: String,
        required: true
    },
    type: {
        type: String
    }, 
    typeId: {
        type: String
    },
    status: {
        type: String
    } 
}, 
{ 
    timestamps: true
});

const Notifications = mongoose.model('Notifications', notificationsSchema);
module.exports = Notifications;