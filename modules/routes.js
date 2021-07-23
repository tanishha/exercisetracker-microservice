const Router = require("express").Router();
const Ctrl = require('./controller')

Router.route("/users").post(Ctrl.postuser).get(Ctrl.getusers)
Router.route("/users/:_id/exercises").post(Ctrl.postexercise)
module.exports = Router;