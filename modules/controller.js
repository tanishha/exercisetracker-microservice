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
    const user_id = req.params._id;
    const {
        duration,
        description
    } = req.body;
    let date = req.body.date ? new Date(req.body.date) : new Date();

    if (user_id && duration && description) {
        usermodel.findById(user_id, (err, data) => {
            if (!data) {
                res.send("Unknown userId");
                console.log("UNKNOWN USERID TRIGGERED");
            } else {
                const username = data.username;
                const newExercise = new exercisemodel({
                    user_id,
                    username,
                    "date": date.toDateString(),
                    duration,
                    description
                });

                newExercise.save((err, data) => {
                    if (err) console.error(err);
                    console.log("EXERCISE ADDED: ", {
                        "_id": user_id,
                        username,
                        "date": date.toDateString(),
                        duration,
                        description
                    });
                    res.json({
                        "_id": user_id,
                        username,
                        "date": date.toDateString(),
                        "duration": parseInt(duration),
                        description
                    });
                });
            }
        });
    } else {
        res.send("Please fill in all required fields.");
    }
}

function logs(req, res) {
    const {
        from,
        to,
        limit
    } = req.query;
    const fromDate = (moment(new Date(from), 'YYYY-MM-DD', true).isValid()) ? moment(new Date(from), 'YYYY-MM-DD') : 0;
    const toDate = (moment(new Date(to), 'YYYY-MM-DD', true).isValid()) ? moment(new Date(to), 'YYYY-MM-DD') : moment().add(1000000000000);

    exercisemodel
        .find({
            user_id: req.params._id,
            date: {
                $gte: fromDate,
                $lte: toDate
            }
        }).limit(+limit).exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                })
            }
            if (!user) return res.json('Unknown user with _id');
            res.json({
                _id: req.params._id,
                username: user[0].username,
                count: user.length,
                log: (user.map(function (item) {
                    return ({
                        description: item.description,
                        duration: parseInt(item.duration),
                        date: moment(new Date(item.date)).format('ddd MMMM D YYYY'),
                    })
                }))

            });

        });
}



module.exports = {
    postuser,
    getusers,
    postexercise,
    logs,
};