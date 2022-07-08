const mongoose = require("mongoose");
require('mongoose-type-email');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('users', usersSchema);