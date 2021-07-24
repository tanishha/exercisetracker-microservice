const Router = require("express").Router();
const Ctrl = require('./controller')

Router.route("/users").post(Ctrl.postuser).get(Ctrl.getusers)
Router.route("/users/exercises").post(Ctrl.postexercise)
Router.route("/users/logs").get(Ctrl.logs)

module.exports = Router;