const usermodel = require("./usermodel")
const exercisemodel = require("./exercisemodel")
const moment = require("moment")

function postuser(req, res) {
    const newUser = new usermodel({
        username: req.body.username,
    });
    newUser.save()
        .then(function (data) {
            res.json({
                _id: data.id,
                username: data.username
            })
        })
        .catch(function (err) {
            return res.status(500).json({
                msg: err.message
            })
        })
}

function getusers(req, res) {
    usermodel.find({})
        .sort({
            _id: -1
        })
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                })
            }
            res.json(users)
        })
}

function postexercise(req, res) {
    try {
        const {
            duration,
            description
        } = req.body
        var date = req.body.date || moment(new Date()).format('ddd MMMM D YYYY');
        usermodel.findById(req.body._id).exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                })
            }
            if (user) {
                const newexercise = new exercisemodel({
                    date,
                    duration,
                    description,
                    user_id: req.body._id,
                    username: user.username,
                });
                newexercise.save()
                res.json({
                    _id: req.body._id,
                    username: user.username,
                    date: moment(new Date(date)).format('ddd MMMM D YYYY'),
                    duration: duration,
                    description: description
                })

            } else {
                res.json(
                    "not found",
                );
            }
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

function logs(req, res) {

    exercisemodel
        .find({
            user_id: req.params._id,
        }).exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                })
            }
            if (user) {
                // res.json(user.map(function(item) {
                //     return({
                //         _id: user[0].user_id,
                //         username: user[0].username,
                //     count: item.length,
                //     log: [{
                //         date: item.date,
                //         duration: item.duration
                //     },


                // ]
                //     });
                // }));
                res.json({
                    _id: user[0].user_id,
                    username: user[0].username,
                    count: user.length,
                    log: (user.map(function (item) {
                        return ({
                            description: item.description,
                            duration: item.duration,
                            date: moment(new Date(item.date)).format('ddd MMMM D YYYY'),


                        })
                    }))
                    // {
                    //                         date:  user[0].date,
                    //                         duration: user[0].duration
                    //                     },
                    //                     {
                    //                         date:  user[1].date,
                    //                         duration: user[1].duration
                    //                     }


                });
            } else {
                return res.status(500).json({
                    msg: err.message
                })
            }
        });
}
// _id:user.user_id,
// username:user.username
module.exports = {
    postuser,
    getusers,
    postexercise,
    logs
};