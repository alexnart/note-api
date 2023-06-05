const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length <= 5) {
                throw new Error("password must be 5 characters");
            }
        }
    },
  
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
});


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username }); 
    if(!user) {
        throw new Error('Unable to log in')
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.statics.findByToken = async (token) => {
    const user = await User.find({ "tokens.token" : token }); 
    if(!user) {
        throw new Error('Unable to find user')
    }
    return user
}

const User = mongoose.model('User', userSchema);
module.exports = User