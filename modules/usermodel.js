//schema definition
var Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
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
