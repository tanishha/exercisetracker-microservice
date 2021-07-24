//schema definition
var Mongoose = require('mongoose');

const ExerciseSchema = new Mongoose.Schema({
    userId: {
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
   });
module.exports = Mongoose.model("ExerciseModel", ExerciseSchema);