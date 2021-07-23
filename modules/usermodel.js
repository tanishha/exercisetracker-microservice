//schema definition
var Mongoose = require('mongoose');
let today = new Date()
const formatYmd = today => today.toISOString().slice(0, 10);
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
