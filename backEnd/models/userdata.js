const mongoose = require('mongoose');

const InstaSchema = new mongoose.Schema({
    userID:{type: String, required: true  , unique:true},
    name: { type: String, required: true },
    email: { type: String, required: true  , unique:true},
    phone: { type: String, required: true ,unique:true},
    gender: {
        type: String,
        required: true,
        enum: ['male', 'Female', 'Others']
    },
    password: { type: String, required: true }
},{timestamps:true});

const InstaUsers = mongoose.model("instaUsers", InstaSchema);

module.exports = InstaUsers;
