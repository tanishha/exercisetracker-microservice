//schema definition
var Mongoose = require('mongoose');

const ExerciseSchema = new Mongoose.Schema({
    user_id: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    username:{
        type:String
    }
});
module.exports = Mongoose.model("ExerciseModel", ExerciseSchema);