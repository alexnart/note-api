const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String
    },
    location: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is inbalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("password musn\'t contain 'password'");
            }
        }
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate(value) {
            if (value.length != 10) {
                throw new Error("phone number must be 10 digits");
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }); 
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