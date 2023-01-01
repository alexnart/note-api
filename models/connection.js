const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const connectionsSchema = new mongoose.Schema({
  
    userId: {
        type: ObjectID,
        required: true, 
        ref: 'User'
    }, 
    otherUserId: {
        type: ObjectID,
        required: true, 
        ref: 'User'
    }, 
}, 
{ 
    timestamps: true
});

const Connections = mongoose.model('Connections', connectionsSchema);
module.exports = Connections;