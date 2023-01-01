const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    media: {
        type: String
    },
    mediaType: {
        type: String
    },
    text: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post