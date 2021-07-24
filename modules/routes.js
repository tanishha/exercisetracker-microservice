const Router = require("express").Router();
const Ctrl = require('./controller')

Router.route("/users").post(Ctrl.postuser).get(Ctrl.getusers)
Router.route("/exercise/add").post(Ctrl.postexercise)
Router.route("/exercise/log").get(Ctrl.logs)

module.exports = Router;