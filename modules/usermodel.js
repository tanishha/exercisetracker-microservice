//schema definition
var Mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = new Mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    username: {
        type: String,
        required:true,
        unique:true
    },
    count:{
        type:Number,
    },
});
module.exports = Mongoose.model("UserModel", UserSchema);
