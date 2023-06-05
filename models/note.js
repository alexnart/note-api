const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length != 7) {
                throw new Error("color must be 7 characters");
            }
        }
    }
}, {
    timestamps: true
});


const Note = mongoose.model('Note', noteSchema)
module.exports = Note;