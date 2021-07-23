//schema definition
var Mongoose = require('mongoose');

const ExerciseSchema = new Mongoose.Schema({
    user_id: {
        type: String
    },
    description: {
        type: Array,
        required: true,
        default: []
    },
    duration: {
        type: Array,
        required: true,
        default: []
    },
    date: {
        type: Array,
        default: new Date().toUTCString()
    },
    username:{
        type:String
    }
});
module.exports = Mongoose.model("ExerciseModel", ExerciseSchema);