const mongoose = require('mongoose');
const validator = require('validator');
const ObjectID = mongoose.Schema.Types.ObjectId;


const dislikesSchema = new mongoose.Schema({
    typeId: {
        type: String
    },
    type: {
        type: String
    },
    userId: {
        type: ObjectID,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Dislikes = mongoose.model('Dislikes', dislikesSchema); 
module.exports = Dislikes