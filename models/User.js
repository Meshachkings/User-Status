const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    first_name: String,
    last_name: String,
    Status: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("users", UserSchema);