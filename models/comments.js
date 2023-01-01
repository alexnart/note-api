const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const commentsSchema = new mongoose.Schema({
    text: {
        type: String
    }, 
    userId: {
        type: ObjectID,
        required: true, 
        ref: 'User'
    }, 
    postId: {
        type: ObjectID,
        required: true, 
        ref: 'Post'
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
}, 
{ 
    timestamps: true
});

const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;