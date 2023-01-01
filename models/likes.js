const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;


const likesSchema = new mongoose.Schema({

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

const Likes = mongoose.model('Likes', likesSchema); 
module.exports = Likes